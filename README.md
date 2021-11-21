# Url Shortener

## Requirements

For development, you will only need Node.js, a node global package, npm, MySQL and Redis installed in your development environment.

### Node

- #### Node installation on Windows

  Visit [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH and `npm` (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Node installation on macOS

  You can install nodejs and npm easily with brew install, just run the following commands.

      $ brew install node

### MySQL

- ### Installation

  Visit [MySQL official documentation](https://dev.mysql.com/doc/mysql-installer/en/) for installation guide.

### Redis

- ### Installation

  Visit [Redis official website](https://redis.io/) for installation guide.

---

## Clone

    $ git clone https://github.com/ayodeleoniosun/url-shortener.git
    $ cd url-shortener

## Configure app

- Copy the contents of .env.sample to env - `cp .env.sample .env`
- You can replace the database credentials where necessary
- Create the database on your local MySQL instance
- Run the `setup.sh` file in the project root. \
  If you got a permission error, please run `chmod +x setup.sh` to change permission, then try again.\
  The `setup.sh` file does the following:

  - Installs project Dependencies
  - Runs the Project Build
  - Runs the Database Migration

## Run app

- Run `npm start` to start the app (app runs on PORT 3000 by default).
- Run `nodemon dev` to start the app in development mode.
- Run `npm test` to run test.
- [Published Postman URL](https://documenter.getpostman.com/view/18037473/UVJWqKw3)

## Design & Implementation Decisions

- Shortened URL was stored in both db and redis for faster access and better performance.
