#!/bin/bash

# Cache Laravel config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM in background
php-fpm &

# Start Nginx
nginx -g "daemon off;"