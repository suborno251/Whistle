#!/bin/bash

cd /var/www/html

# Write Render's env vars into .env so Laravel can read them
cat > .env << EOF
APP_NAME=${APP_NAME:-Whistle}
APP_ENV=${APP_ENV:-production}
APP_KEY=${APP_KEY}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-${RENDER_EXTERNAL_URL:-https://whistle-lunv.onrender.com}}

LOG_CHANNEL=stderr
LOG_LEVEL=debug

CACHE_STORE=file
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

DB_CONNECTION=${DB_CONNECTION:-sqlite}
DB_HOST=${DB_HOST:-127.0.0.1}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-whistle}
DB_USERNAME=${DB_USERNAME:-root}
DB_PASSWORD=${DB_PASSWORD:-}
EOF

# Ensure database directory and sqlite file exist with correct permissions
touch /var/www/html/database/database.sqlite
chown -R www-data:www-data /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public

# Clear any old cached config
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Re-cache with correct values
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start scheduler in background
php artisan schedule:work &

# Start PHP-FPM in background
php-fpm &

# Start Nginx in foreground
nginx -g "daemon off;"