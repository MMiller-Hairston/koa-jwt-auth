import Knex from "knex";

export const db =
  process.env.NODE_ENV === "development"
    ? Knex({
        client: "sqlite3",
        connection: {
          filename: "dev.sqlite",
        },
        useNullAsDefault: true,
      })
    : Knex({
        client: "pg",
        useNullAsDefault: true,
        connection: {
          connectionString: process.env.DB_CONNECTION_STRING,
          ssl: { rejectUnauthorized: false },
        },
      });
