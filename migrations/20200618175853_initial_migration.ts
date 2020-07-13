import Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  if (process.env.NODE_ENV === "development") {
    return await knex.schema.createTable("users", (table) => {
      table.uuid("id").notNullable().primary();
      table.string("username").unique();
      table.string("email").notNullable().unique();
      table.string("salted_password").notNullable();
      table.string("full_name");
      table.string("profile_picture");
      table.boolean("is_business").defaultTo(false);
      table.string("bio");
      table.string("website");
      table.json("counts");
      table.dateTime("created_at");
      table.dateTime("updated_at");
    });
  } else {
    await knex.raw('create extension if not exists "uuid-ossp"');

    return await knex.schema.createTable("users", (table) => {
      table
        .uuid("id")
        .notNullable()
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("username").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("salted_password").notNullable();
      table.string("full_name");
      table.string("profile_picture");
      table.boolean("is_business").defaultTo(false);
      table.string("bio");
      table.string("website");
      table.json("counts");
      table.dateTime("created_at");
      table.dateTime("updated_at");
    });
  }
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists("users");
  return await knex.raw('drop extension if exists "uuid-ossp"');
}
