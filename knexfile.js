require("ts-node").register();

const config = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DB_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
    },
  },
};

module.exports = config[process.env.NODE_ENV];
