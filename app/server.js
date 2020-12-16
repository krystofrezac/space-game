const fs = require('fs');

const chalk = require('chalk');
const express = require('express');
const next = require('next');

const prefabConfig = require('./src/config/prefab');

const createConfig = () => {
  const configPath = `${__dirname}/src/config/index.js`;
  if (fs.existsSync(configPath)) fs.unlinkSync(configPath);
  fs.writeFileSync(
    configPath,
    `module.exports=${JSON.stringify(prefabConfig(process.env))}`,
  );
};

(async () => {
  const app = next({ dev: process.env.NODE_ENV !== 'production' });
  const handle = app.getRequestHandler();
  const server = express();

  await app.prepare();

  createConfig();

  // eslint-disable-next-line global-require
  const config = require('./src/config');
  const { port } = config;

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(
    chalk.green('ready'),
    `started server on http://localhost:${port}`,
  ); // eslint-disable-line no-console
})();
