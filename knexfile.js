require('ts-node').register();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DB_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false }
    }
  }
};
