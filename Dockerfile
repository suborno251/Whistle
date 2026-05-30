# Stage 1 — Build
FROM composer:2 AS build
WORKDIR /app
COPY . .
RUN cp .env.example .env
RUN composer install --optimize-autoloader --no-dev

# Stage 2 — PHP-FPM + Nginx
FROM php:8.4-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev \
    zip unzip nginx nodejs npm \
    && apt-get clean

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Copy built app from Stage 1
WORKDIR /var/www/html
COPY --from=build /app .

# Install Node deps and build React
RUN npm install && npm run build

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache

# Nginx config
COPY docker/nginx.conf /etc/nginx/sites-available/default

# Start script
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080
CMD ["/start.sh"]