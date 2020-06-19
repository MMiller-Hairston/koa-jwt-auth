import Knex from 'knex';

export const db = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  }
});
