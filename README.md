# @yme/dotenv

`dotenv` + `dotenv-expand` and load multiple env files

```
assign(
.env
.env.local
.env.{NODE_ENV}
.env.{NODE_ENV}.local
)
```

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
