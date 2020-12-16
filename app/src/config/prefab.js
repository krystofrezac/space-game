const prefabConfig = env => ({
  production: env.NODE_ENV === 'production',
  port: env.port || 3000,
  apiURL: env.apiURL || 'http://localhost:4000',
});

module.exports = prefabConfig;
