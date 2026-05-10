#!/bin/bash
# ============================================================
#  MANUAL STEP-BY-STEP COMMANDS
#  Copy-paste these one section at a time on your EC2
#  Works on: Ubuntu 22.04 LTS (recommended) / Amazon Linux 2023
# ============================================================

# ── PREREQUISITES ──────────────────────────────────────────
# EC2 instance: t3.small or larger (2GB RAM recommended)
# AMI: Ubuntu Server 22.04 LTS
# Security Group inbound rules:
#   SSH  (22)  — your IP
#   HTTP (80)  — 0.0.0.0/0
#   HTTPS (443) — 0.0.0.0/0
#   Custom TCP (3000) — 0.0.0.0/0  [optional, for direct access]

# ── CONNECT TO YOUR EC2 ────────────────────────────────────
# ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# ──────────────────────────────────────────────────────────
# [1] SYSTEM UPDATE
# ──────────────────────────────────────────────────────────
sudo apt-get update -y && sudo apt-get upgrade -y

# Install required system packages
sudo apt-get install -y \
  curl wget git unzip \
  build-essential \
  nginx \
  certbot python3-certbot-nginx

# ──────────────────────────────────────────────────────────
# [2] INSTALL NODE.JS 20 VIA NVM
# ──────────────────────────────────────────────────────────
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Reload shell (or open a new terminal session)
source ~/.bashrc
# OR: source ~/.nvm/nvm.sh

# Install Node 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version   # Should show v20.x.x
npm --version    # Should show 10.x.x

# ──────────────────────────────────────────────────────────
# [3] INSTALL PM2 (Process Manager)
# ──────────────────────────────────────────────────────────
npm install -g pm2

# Configure PM2 to start on system boot
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/$(node --version)/bin \
  pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Verify
pm2 --version

# ──────────────────────────────────────────────────────────
# [4] UPLOAD YOUR CODE
# ──────────────────────────────────────────────────────────
# FROM YOUR LOCAL MACHINE (run this in a new terminal):
# scp -i your-key.pem devops-portfolio.zip ubuntu@<EC2_IP>:~/

# BACK ON EC2:
mkdir -p /var/www/portfolio
cd ~
unzip devops-portfolio.zip -d portfolio-temp
sudo cp -r portfolio-temp/devops-portfolio/. /var/www/portfolio/
sudo chown -R ubuntu:ubuntu /var/www/portfolio
cd /var/www/portfolio

# Verify files are there
ls -la

# ──────────────────────────────────────────────────────────
# [5] INSTALL NPM DEPENDENCIES
# ──────────────────────────────────────────────────────────
cd /var/www/portfolio

# Install all packages (takes 2-4 minutes)
npm install --legacy-peer-deps

# If you hit memory errors on t2.micro, use:
# NODE_OPTIONS="--max-old-space-size=512" npm install --legacy-peer-deps

# ──────────────────────────────────────────────────────────
# [6] SET ENVIRONMENT VARIABLES
# ──────────────────────────────────────────────────────────
cd /var/www/portfolio
cp .env.example .env.local
nano .env.local

# Minimum required content for .env.local:
# NEXT_PUBLIC_SITE_URL=http://YOUR_EC2_IP
# CONTACT_EMAIL=your@email.com

# ──────────────────────────────────────────────────────────
# [7] BUILD FOR PRODUCTION
# ──────────────────────────────────────────────────────────
cd /var/www/portfolio

# Set memory limit (critical on low-RAM instances)
export NODE_OPTIONS="--max-old-space-size=1024"

# Run the build
npm run build

# This takes 2-5 minutes. You should see:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages

# ──────────────────────────────────────────────────────────
# [8] START WITH PM2
# ──────────────────────────────────────────────────────────
cd /var/www/portfolio

# Start the app
pm2 start npm --name "devops-portfolio" -- start

# Save PM2 state (survives reboots)
pm2 save

# Check it's running
pm2 status
pm2 logs devops-portfolio --lines 20

# Test locally on EC2
curl http://localhost:3000
# Should return HTML — means the app is running!

# ──────────────────────────────────────────────────────────
# [9] CONFIGURE NGINX REVERSE PROXY
# ──────────────────────────────────────────────────────────

# Replace YOUR_EC2_IP with your actual public IP
EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo "Your EC2 IP: $EC2_IP"

sudo tee /etc/nginx/sites-available/portfolio > /dev/null << EOF
server {
    listen 80;
    server_name $EC2_IP _;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Cache Next.js static assets
    location /_next/static/ {
        proxy_pass http://localhost:3000/_next/static/;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
sudo systemctl enable nginx

# ──────────────────────────────────────────────────────────
# [10] VERIFY EVERYTHING IS WORKING
# ──────────────────────────────────────────────────────────
pm2 status
sudo systemctl status nginx

# Test HTTP response
curl -I http://localhost
# Should return: HTTP/1.1 200 OK

echo "================================================"
echo "✓ Portfolio is LIVE at: http://$EC2_IP"
echo "================================================"

# ──────────────────────────────────────────────────────────
# [OPTIONAL] HTTPS WITH FREE SSL (needs a domain name)
# ──────────────────────────────────────────────────────────
# 1. Point your domain DNS → EC2 public IP (A record)
# 2. Wait 5-10 min for DNS propagation
# 3. Run:
#    sudo certbot --nginx -d yourdomain.com
#    (follow prompts, choose redirect HTTP→HTTPS)
# 4. Certbot auto-renews every 90 days

# ──────────────────────────────────────────────────────────
# USEFUL MANAGEMENT COMMANDS
# ──────────────────────────────────────────────────────────
# View logs:          pm2 logs devops-portfolio
# Restart app:        pm2 restart devops-portfolio
# Stop app:           pm2 stop devops-portfolio
# Nginx reload:       sudo systemctl reload nginx
# Nginx logs:         sudo tail -f /var/log/nginx/error.log
# Rebuild & restart:  cd /var/www/portfolio && npm run build && pm2 restart devops-portfolio
