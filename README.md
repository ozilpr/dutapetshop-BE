# Project Setup

### Create .env file:
```
# server
PORT=3000
HOST=127.0.0.1

# Jwt token
ACCESS_TOKEN_KEY={secret}
REFRESH_TOKEN_KEY={secret}
ACCESS_TOKEN_AGE=86400

# node-postgres configuration
PGUSER={YOUR_POSTGRES_USER}
PGHOST=localhost
PGPASSWORD={YOUR_POSTGRES_PASSWORD}
PGDATABASE=dutapetshop
PGPORT=5432
```

as you can see `ACCESS_TOKEN_KEY` and `REFRESH_TOKEN_KEY` value is `{secret}`,
you can generate by yourself using terminal:
```shell
node
```
then:
```shell
require('crypto').randomBytes(64).toString('hex');
```
copy the generated string to `ACCESS_TOKEN_KEY` value, do the same for `REFRESH_TOKEN_KEY`.

### Developing Project
```shell
npm install

npm run migrate up

npm run start:dev
```
project will run using nodemon, use `CTRL + C` to stop

### Running the Project
```shell
npm install --omit=dev

npm run migrate up

npm run start
```
you can stop run the project by:
```shell
npm run stop
```