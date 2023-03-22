#!/usr/bin/env bash

sudo chmod -R 0777 ./var
sudo chown -R www-data ./var

docker-compose build && docker-compose up -d

docker-compose exec fpm composer install --optimize-autoloader
docker-compose exec fpm php bin/console --no-interaction doctrine:migrations:migrate
docker-compose exec fpm php bin/console --no-interaction doctrine:fixtures:load

