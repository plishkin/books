## Simple sample application that allows to manage books data using Restful API

![scrrenshot](https://raw.githubusercontent.com/plishkin/books/master/screen.png)

### Uses

- **[Symfony](https://symfony.com/)**
- **[Typescript](https://www.typescriptlang.org/)**
- **[ReactJS](https://reactjs.org/)**
- **[SCSS](https://sass-lang.com/)**
- **[Bootstrap](https://getbootstrap.com/)**
- **[Docker](https://www.docker.com/)**

## Installation

### Clone the project with git

```bash
git clone https://github.com/plishkin/books.git
```

Go to the cloned project folder

```bash
cd books
```

Copy and configure .env file

by default APP_PORT is 8082

```bash
cp .env.dev .env
```


### Up and running with docker

#### Run build script 
```bash
bash docker_build.sh
```

### Visit in your browser

http://localhost:8082 

### Run tests

#### Backend
```bash
cp phpunit.xml.dist phpunit.xml
```
```bash
docker-compose exec fpm php bin/phpunit 
```

#### Frontend
```bash
yarn install
```
```bash
yarn run test
```