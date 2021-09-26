# @yme/dotenv

[![npm](https://img.shields.io/npm/v/@yme/dotenv.svg)](https://www.npmjs.com/package/@yme/dotenv)

`dotenv` + `dotenv-expand` and load multiple env files

```
assign(
.env
.env.local
.env.{NODE_ENV}
.env.{NODE_ENV}.local
)
```

## install

npm

```sh
npm i @yme/dotenv
```

yarn

```sh
yarn add @yme/dotenv
```

## usage

node

```js
require('@yme/dotenv')();

console.log(process.env);
```

cli

```bash
DOTENV_CONFIG_PATH=.env node -r @yme/dotenv/config serve.js
# multiple
DOTENV_CONFIG_PATH=.env,.env.local node -r @yme/dotenv/config serve.js
```

bin

```bash
# npm run start script
# load dotenv and cross-env
dotenv HELLO=world concurrently npm:start-*
```
