#!/bin/bash
# ================================================================
#  ONE-SHOT DEPLOY SCRIPT — Chandan's DevOps Portfolio
#  EC2 pe ek baar run karo — sab kuch automatic ho jayega
#
#  Usage:
#    curl -fsSL https://raw.githubusercontent.com/coding-chandan/YOUR_REPO/main/deploy.sh | sudo bash
#  
#  Ya manually:
#    sudo bash deploy.sh
#
#  Tested on: Ubuntu 22.04 LTS
# ================================================================

set -e  # koi bhi error aaye to script ruk jaye

# ── CONFIG — SIRF YEH BADLO ────────────────────────────────────
GITHUB_REPO="https://github.com/coding-chandan/devops-portfolio.git"
BRANCH="main"
APP_DIR="/var/www/portfolio"
APP_NAME="devops-portfolio"
APP_PORT=3000
NODE_VERSION=20
# ───────────────────────────────────────────────────────────────

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log()     { echo -e "${GREEN}  ✓ $1${NC}"; }
info()    { echo -e "${CYAN}  → $1${NC}"; }
warn()    { echo -e "${YELLOW}  ! $1${NC}"; }
error()   { echo -e "${RED}  ✗ $1${NC}"; exit 1; }
section() { echo -e "\n${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; echo -e "${BOLD}${CYAN}  $1${NC}"; echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }

# Root check
if [ "$EUID" -ne 0 ]; then
  error "Please run as root: sudo bash deploy.sh"
fi

# Get current user (non-root)
REAL_USER="${SUDO_USER:-ubuntu}"
REAL_HOME=$(eval echo "~$REAL_USER")

echo -e "\n${BOLD}${CYAN}"
echo "  ██████╗ ███████╗██████╗ ██╗      ██████╗ ██╗   ██╗"
echo "  ██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝"
echo "  ██║  ██║█████╗  ██████╔╝██║     ██║   ██║ ╚████╔╝ "
echo "  ██║  ██║██╔══╝  ██╔═══╝ ██║     ██║   ██║  ╚██╔╝  "
echo "  ██████╔╝███████╗██║     ███████╗╚██████╔╝   ██║   "
echo "  ╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   "
echo -e "${NC}"
echo -e "  ${BOLD}Chandan Maheshwari — Portfolio Auto-Deploy${NC}"
echo -e "  Repo: ${GITHUB_REPO}"
echo -e "  Dir:  ${APP_DIR}"
echo ""

# ─────────────────────────────────────────
# STEP 1 — System Update
# ─────────────────────────────────────────
section "STEP 1/8 — System Update"

apt-get update -y -q
apt-get install -y -q \
  curl wget git unzip \
  build-essential \
  nginx \
  certbot python3-certbot-nginx \
  ufw

log "System packages installed"

# ─────────────────────────────────────────
# STEP 2 — Node.js via NVM
# ─────────────────────────────────────────
section "STEP 2/8 — Installing Node.js ${NODE_VERSION}"

export NVM_DIR="/root/.nvm"

if [ ! -d "$NVM_DIR" ]; then
  info "NVM install ho raha hai..."
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi

# Load NVM
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node
nvm install $NODE_VERSION --silent
nvm use $NODE_VERSION
nvm alias default $NODE_VERSION

# Symlink globally
NODE_BIN=$(nvm which current)
ln -sf "$NODE_BIN" /usr/local/bin/node
ln -sf "$(dirname $NODE_BIN)/npm" /usr/local/bin/npm
ln -sf "$(dirname $NODE_BIN)/npx" /usr/local/bin/npx

log "Node.js $(node --version) installed"
log "npm $(npm --version) installed"

# ─────────────────────────────────────────
# STEP 3 — PM2
# ─────────────────────────────────────────
section "STEP 3/8 — Installing PM2"

npm install -g pm2 --silent
pm2 startup systemd -u root --hp /root 2>/dev/null || true

log "PM2 $(pm2 --version) installed"

# ─────────────────────────────────────────
# STEP 4 — Clone / Pull from GitHub
# ─────────────────────────────────────────
section "STEP 4/8 — Cloning from GitHub"

if [ -d "$APP_DIR/.git" ]; then
  info "Existing repo found — pulling latest..."
  cd "$APP_DIR"
  git fetch origin
  git reset --hard origin/$BRANCH
  git pull origin $BRANCH
  log "Repo updated to latest commit"
else
  info "Fresh clone ho raha hai..."
  rm -rf "$APP_DIR"
  git clone --branch "$BRANCH" "$GITHUB_REPO" "$APP_DIR"
  log "Repo cloned successfully"
fi

cd "$APP_DIR"
COMMIT=$(git log --oneline -1)
log "Current commit: $COMMIT"

# ─────────────────────────────────────────
# STEP 5 — Environment File
# ─────────────────────────────────────────
section "STEP 5/8 — Environment Variables"

if [ ! -f "$APP_DIR/.env.local" ]; then
  # Get public IP automatically
  PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null \
           || curl -s https://api.ipify.org \
           || echo "localhost")

  cat > "$APP_DIR/.env.local" << EOF
NEXT_PUBLIC_SITE_URL=http://${PUBLIC_IP}
CONTACT_EMAIL=chandan@cloud.dev
RESEND_API_KEY=
GITHUB_TOKEN=
GITHUB_USERNAME=coding-chandan
EOF

  log ".env.local created (site URL: http://${PUBLIC_IP})"
  warn "Contact form ke liye RESEND_API_KEY add karo: nano $APP_DIR/.env.local"
else
  log ".env.local already exists — skipping"
fi

# ─────────────────────────────────────────
# STEP 6 — Install & Build
# ─────────────────────────────────────────
section "STEP 6/8 — Installing Dependencies & Building"

cd "$APP_DIR"

# Increase swap if low RAM (t2.micro ke liye)
TOTAL_RAM=$(free -m | awk '/^Mem:/{print $2}')
if [ "$TOTAL_RAM" -lt 2000 ]; then
  warn "Low RAM detected (${TOTAL_RAM}MB) — swap add ho raha hai..."
  if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    log "2GB Swap added"
  fi
fi

info "npm install chal raha hai... (2-3 min)"
npm install --legacy-peer-deps --silent

info "Production build chal raha hai... (3-5 min)"
export NODE_OPTIONS="--max-old-space-size=1024"
npm run build

log "Build successful!"

# ─────────────────────────────────────────
# STEP 7 — PM2 Start
# ─────────────────────────────────────────
section "STEP 7/8 — Starting App with PM2"

# PM2 ecosystem config
cat > "$APP_DIR/ecosystem.config.js" << EOF
module.exports = {
  apps: [{
    name: '${APP_NAME}',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '${APP_DIR}',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT: ${APP_PORT},
    },
    error_file: '/var/log/pm2/${APP_NAME}-error.log',
    out_file:   '/var/log/pm2/${APP_NAME}-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }],
};
EOF

mkdir -p /var/log/pm2

# Stop old instance if running
pm2 delete "$APP_NAME" 2>/dev/null || true

# Start fresh
pm2 start "$APP_DIR/ecosystem.config.js"
pm2 save

# Wait and check
sleep 3
if pm2 list | grep -q "$APP_NAME.*online"; then
  log "PM2 app '$APP_NAME' is ONLINE on port $APP_PORT"
else
  error "PM2 app start nahi hua! Run: pm2 logs $APP_NAME"
fi

# ─────────────────────────────────────────
# STEP 8 — Nginx
# ─────────────────────────────────────────
section "STEP 8/8 — Configuring Nginx"

PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null \
         || curl -s https://api.ipify.org \
         || echo "_")

cat > /etc/nginx/sites-available/portfolio << EOF
server {
    listen 80;
    server_name ${PUBLIC_IP} _;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    # Next.js app
    location / {
        proxy_pass http://localhost:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }

    # Cache Next.js static files
    location /_next/static/ {
        proxy_pass http://localhost:${APP_PORT}/_next/static/;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Favicon & public files
    location ~* \.(ico|png|jpg|jpeg|svg|webp|woff2?)$ {
        proxy_pass http://localhost:${APP_PORT};
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
rm -f /etc/nginx/sites-enabled/default

# Test config
nginx -t || error "Nginx config galat hai!"

# Start / reload
systemctl restart nginx
systemctl enable nginx

log "Nginx configured and running"

# ── Firewall ────────────────────────────
ufw --force enable
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow $APP_PORT/tcp
log "Firewall rules set"

# ── Create helper commands ───────────────────

cat > /usr/local/bin/deploy << SCRIPT
#!/bin/bash
# Portfolio update karo — latest GitHub changes pull karke rebuild karo
set -e
APP_DIR="${APP_DIR}"
APP_NAME="${APP_NAME}"
BRANCH="${BRANCH}"

echo "→ GitHub se latest pull ho raha hai..."
cd \$APP_DIR
git fetch origin
git reset --hard origin/\$BRANCH
git pull origin \$BRANCH

echo "→ .next cache delete ho raha hai..."
rm -rf .next

echo "→ Dependencies install ho rahi hain..."
npm install --legacy-peer-deps --silent

echo "→ Build chal raha hai..."
export NODE_OPTIONS="--max-old-space-size=1024"
npm run build

echo "→ PM2 restart ho raha hai..."
pm2 restart \$APP_NAME

echo ""
echo "✓ Deploy complete! Portfolio live hai."
pm2 status
SCRIPT
chmod +x /usr/local/bin/deploy

cat > /usr/local/bin/portfolio-logs << SCRIPT
#!/bin/bash
pm2 logs ${APP_NAME} --lines 50
SCRIPT
chmod +x /usr/local/bin/portfolio-logs

cat > /usr/local/bin/portfolio-status << SCRIPT
#!/bin/bash
echo "=== PM2 Status ==="
pm2 status
echo ""
echo "=== Nginx Status ==="
systemctl is-active nginx && echo "Nginx: RUNNING" || echo "Nginx: STOPPED"
echo ""
echo "=== HTTP Check ==="
curl -s -o /dev/null -w "App Response: HTTP %{http_code}\n" http://localhost:${APP_PORT}
curl -s -o /dev/null -w "Nginx Response: HTTP %{http_code}\n" http://localhost:80
SCRIPT
chmod +x /usr/local/bin/portfolio-status

# ─────────────────────────────────────────
# DONE
# ─────────────────────────────────────────

echo ""
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${GREEN}  🎉 DEPLOY COMPLETE! Chandan ka Portfolio LIVE hai!${NC}"
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${BOLD}Portfolio URL:${NC}"
echo -e "  ${CYAN}http://${PUBLIC_IP}${NC}          ← main URL (Nginx)"
echo -e "  ${CYAN}http://${PUBLIC_IP}:${APP_PORT}${NC}     ← direct Next.js"
echo ""
echo -e "  ${BOLD}Helper Commands:${NC}"
echo -e "  ${YELLOW}deploy${NC}              → GitHub se pull + rebuild + restart"
echo -e "  ${YELLOW}portfolio-status${NC}    → PM2 + Nginx health check"
echo -e "  ${YELLOW}portfolio-logs${NC}      → Live logs dekho"
echo -e "  ${YELLOW}pm2 restart ${APP_NAME}${NC} → Quick restart"
echo ""
echo -e "  ${BOLD}HTTPS setup (domain hone par):${NC}"
echo -e "  ${YELLOW}certbot --nginx -d yourdomain.com${NC}"
echo ""
echo -e "  ${BOLD}Dobara deploy:${NC}"
echo -e "  ${YELLOW}deploy${NC}   ← bas yahi likhna hai!"
echo ""
pm2 status
