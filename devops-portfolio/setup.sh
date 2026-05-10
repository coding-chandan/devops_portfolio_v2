#!/bin/bash
# ============================================================
#  DevOps Portfolio — EC2 Full Setup & Deployment Script
#  Tested on: Ubuntu 22.04 LTS / Amazon Linux 2023
#  Run as: sudo bash setup.sh
# ============================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

log()    { echo -e "${GREEN}[✓]${NC} $1"; }
info()   { echo -e "${BLUE}[→]${NC} $1"; }
warn()   { echo -e "${YELLOW}[!]${NC} $1"; }
section(){ echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; echo -e "${CYAN}  $1${NC}"; echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }

# ─────────────────────────────────────────
# STEP 1 — Detect OS
# ─────────────────────────────────────────
section "STEP 1: Detecting OS"

if [ -f /etc/os-release ]; then
  . /etc/os-release
  OS=$ID
  OS_VERSION=$VERSION_ID
  info "Detected: $PRETTY_NAME"
else
  warn "Cannot detect OS. Assuming Ubuntu."
  OS="ubuntu"
fi

# ─────────────────────────────────────────
# STEP 2 — System Update
# ─────────────────────────────────────────
section "STEP 2: System Update"

if [[ "$OS" == "ubuntu" || "$OS" == "debian" ]]; then
  apt-get update -y
  apt-get upgrade -y
  apt-get install -y curl wget git unzip build-essential nginx certbot python3-certbot-nginx
  log "Ubuntu packages installed"

elif [[ "$OS" == "amzn" ]]; then
  yum update -y
  yum install -y curl wget git unzip gcc gcc-c++ make nginx
  # certbot for Amazon Linux
  amazon-linux-extras install epel -y 2>/dev/null || true
  yum install -y certbot python3-certbot-nginx 2>/dev/null || true
  log "Amazon Linux packages installed"
fi

# ─────────────────────────────────────────
# STEP 3 — Install Node.js 20 LTS (via NVM)
# ─────────────────────────────────────────
section "STEP 3: Installing Node.js 20 LTS"

export NVM_DIR="/root/.nvm"

if [ ! -d "$NVM_DIR" ]; then
  info "Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi

# Load NVM
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install Node 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify
NODE_VER=$(node --version)
NPM_VER=$(npm --version)
log "Node.js: $NODE_VER"
log "npm: $NPM_VER"

# Make node/npm available system-wide
NODE_PATH=$(nvm which current)
ln -sf "$NODE_PATH" /usr/local/bin/node
ln -sf "$(dirname $NODE_PATH)/npm" /usr/local/bin/npm
ln -sf "$(dirname $NODE_PATH)/npx" /usr/local/bin/npx

# ─────────────────────────────────────────
# STEP 4 — Install PM2 (process manager)
# ─────────────────────────────────────────
section "STEP 4: Installing PM2"

npm install -g pm2
pm2 startup systemd -u root --hp /root 2>/dev/null || true
log "PM2 installed: $(pm2 --version)"

# ─────────────────────────────────────────
# STEP 5 — Create app directory & upload code
# ─────────────────────────────────────────
section "STEP 5: Setting Up App Directory"

APP_DIR="/var/www/portfolio"
mkdir -p "$APP_DIR"
log "App directory: $APP_DIR"

# If running from same dir as the zip:
if [ -f "devops-portfolio.zip" ]; then
  info "Found devops-portfolio.zip — extracting..."
  unzip -o devops-portfolio.zip -d /tmp/portfolio-extract
  cp -r /tmp/portfolio-extract/devops-portfolio/. "$APP_DIR/"
  log "Files extracted to $APP_DIR"
else
  warn "devops-portfolio.zip not found in current directory."
  warn "Upload it with: scp devops-portfolio.zip ec2-user@<IP>:~/"
  warn "Then re-run this script, OR manually copy files to $APP_DIR"
fi

# ─────────────────────────────────────────
# STEP 6 — Install npm dependencies
# ─────────────────────────────────────────
section "STEP 6: Installing npm Dependencies"

cd "$APP_DIR"

info "Running npm install (this takes 2-3 minutes)..."
npm install --legacy-peer-deps

log "All dependencies installed"

# ─────────────────────────────────────────
# STEP 7 — Environment Variables
# ─────────────────────────────────────────
section "STEP 7: Environment Variables"

if [ ! -f "$APP_DIR/.env.local" ]; then
  cp "$APP_DIR/.env.example" "$APP_DIR/.env.local" 2>/dev/null || cat > "$APP_DIR/.env.local" << 'EOF'
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_EMAIL=your@email.com
GITHUB_TOKEN=
GITHUB_USERNAME=alexchen-dev
EOF
  warn ".env.local created from template — edit it with your values:"
  warn "  nano $APP_DIR/.env.local"
else
  log ".env.local already exists"
fi

# ─────────────────────────────────────────
# STEP 8 — Build Next.js for production
# ─────────────────────────────────────────
section "STEP 8: Building Next.js (Production Build)"

cd "$APP_DIR"
info "Building... (3-5 minutes on t2.micro, 1-2 min on t3.small+)"

# Set memory limit for build (important on t2.micro with 1GB RAM)
export NODE_OPTIONS="--max-old-space-size=1024"

npm run build
log "Build complete!"

# ─────────────────────────────────────────
# STEP 9 — Configure PM2
# ─────────────────────────────────────────
section "STEP 9: Configuring PM2 Process Manager"

# Create PM2 ecosystem file
cat > "$APP_DIR/ecosystem.config.js" << 'EOF'
module.exports = {
  apps: [
    {
      name: 'devops-portfolio',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/portfolio',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/portfolio-error.log',
      out_file: '/var/log/pm2/portfolio-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
EOF

mkdir -p /var/log/pm2

# Stop any existing instance
pm2 delete devops-portfolio 2>/dev/null || true

# Start the app
pm2 start "$APP_DIR/ecosystem.config.js"
pm2 save
log "PM2 process started and saved"

# ─────────────────────────────────────────
# STEP 10 — Configure Nginx
# ─────────────────────────────────────────
section "STEP 10: Configuring Nginx Reverse Proxy"

# Get public IP
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || curl -s https://api.ipify.org || echo "YOUR_IP")
info "Public IP detected: $PUBLIC_IP"

# Nginx config
cat > /etc/nginx/sites-available/portfolio << EOF
server {
    listen 80;
    server_name $PUBLIC_IP _;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml application/json;

    # Next.js app
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
        proxy_read_timeout 86400;
    }

    # Cache static assets from Next.js
    location /_next/static/ {
        proxy_pass http://localhost:3000/_next/static/;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /favicon.ico {
        proxy_pass http://localhost:3000/favicon.ico;
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

# Enable site (Ubuntu/Debian)
if [[ "$OS" == "ubuntu" || "$OS" == "debian" ]]; then
  ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
  rm -f /etc/nginx/sites-enabled/default
fi

# For Amazon Linux — add include to nginx.conf if needed
if [[ "$OS" == "amzn" ]]; then
  mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
  ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
  if ! grep -q "sites-enabled" /etc/nginx/nginx.conf; then
    sed -i '/http {/a\    include /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf
  fi
fi

# Test and reload Nginx
nginx -t && systemctl reload nginx || systemctl restart nginx
systemctl enable nginx
log "Nginx configured and running"

# ─────────────────────────────────────────
# STEP 11 — Firewall (UFW or iptables)
# ─────────────────────────────────────────
section "STEP 11: Firewall Rules"

if command -v ufw &> /dev/null; then
  ufw --force enable
  ufw allow ssh
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw allow 3000/tcp  # Direct access fallback
  log "UFW firewall configured"
else
  warn "UFW not available. Ensure EC2 Security Group allows:"
  warn "  - Port 22  (SSH)"
  warn "  - Port 80  (HTTP)"
  warn "  - Port 443 (HTTPS)"
  warn "  - Port 3000 (optional direct access)"
fi

# ─────────────────────────────────────────
# STEP 12 — Auto-update script (optional)
# ─────────────────────────────────────────
section "STEP 12: Creating Helper Scripts"

cat > /usr/local/bin/portfolio-update << 'SCRIPT'
#!/bin/bash
# Run this to update and redeploy the portfolio
set -e
APP_DIR="/var/www/portfolio"
cd "$APP_DIR"
echo "→ Installing dependencies..."
npm install --legacy-peer-deps
echo "→ Building..."
export NODE_OPTIONS="--max-old-space-size=1024"
npm run build
echo "→ Restarting PM2..."
pm2 restart devops-portfolio
echo "✓ Portfolio updated and restarted!"
pm2 status
SCRIPT

chmod +x /usr/local/bin/portfolio-update
log "Update script created: portfolio-update"

cat > /usr/local/bin/portfolio-logs << 'SCRIPT'
#!/bin/bash
pm2 logs devops-portfolio --lines 50
SCRIPT
chmod +x /usr/local/bin/portfolio-logs
log "Logs script created: portfolio-logs"

cat > /usr/local/bin/portfolio-status << 'SCRIPT'
#!/bin/bash
echo "=== PM2 Status ==="
pm2 status
echo ""
echo "=== Nginx Status ==="
systemctl status nginx --no-pager -l
echo ""
echo "=== App Health Check ==="
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000
SCRIPT
chmod +x /usr/local/bin/portfolio-status
log "Status script created: portfolio-status"

# ─────────────────────────────────────────
# DONE — Summary
# ─────────────────────────────────────────
section "🎉 SETUP COMPLETE!"

echo -e ""
echo -e "${GREEN}Your portfolio is LIVE at:${NC}"
echo -e "  ${CYAN}http://$PUBLIC_IP${NC}          ← via Nginx (port 80)"
echo -e "  ${CYAN}http://$PUBLIC_IP:3000${NC}     ← direct Next.js"
echo -e ""
echo -e "${YELLOW}Helper commands:${NC}"
echo -e "  portfolio-status   → Check app + nginx health"
echo -e "  portfolio-logs     → View live logs"
echo -e "  portfolio-update   → Rebuild and redeploy"
echo -e "  pm2 restart devops-portfolio  → Quick restart"
echo -e ""
echo -e "${YELLOW}For HTTPS with a domain (optional):${NC}"
echo -e "  1. Point your domain DNS A record → $PUBLIC_IP"
echo -e "  2. Run: certbot --nginx -d yourdomain.com"
echo -e ""
echo -e "${YELLOW}EC2 Security Group must allow:${NC}"
echo -e "  Port 22  (SSH) · Port 80 (HTTP) · Port 443 (HTTPS)"
echo -e ""
echo -e "${GREEN}PM2 Status:${NC}"
pm2 status
