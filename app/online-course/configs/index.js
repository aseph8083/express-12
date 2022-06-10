'use strict';

const generalConfig = {
  appEnv: process.env.APP_ENV,
};

const authConfig = {
  login_token_ttl: 604800, // in second, default 1 weeks 604800,
  passwordSaltRound: 10,
  tokenPrivateKey: 'expressTutorialKey',
}

const psql = {
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
  database: process.env.PSQL_DATABASE,
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  ssl: process.env.PSQL_SSL,
};

module.exports = {
  generalConfig,
  authConfig,
  psql,
};