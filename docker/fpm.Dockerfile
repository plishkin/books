FROM php:8.1-fpm

RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install iputils-ping -y
RUN docker-php-ext-install pdo pdo_mysql

# Xdebug
ARG INSTALL_XDEBUG=false
RUN if [ ${INSTALL_XDEBUG} = true ]; \
    then \
      pecl install xdebug && docker-php-ext-enable xdebug; \
    fi;

COPY docker/configs/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/app



