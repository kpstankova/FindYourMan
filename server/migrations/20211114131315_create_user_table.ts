import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", (table: Knex.TableBuilder) => {
    table.increments("user_id");
    table.string("email", 128).notNullable().unique();
    table.string("password").notNullable();
    table.string("role").notNullable();
    table.string("name", 128);
    table.string("phone").unique();
    table.string("vat").unique();
    table.string("address");
    table.string("profile_pic");
    table.integer("verified").notNullable().defaultTo(0);
    table.float("rating").notNullable().defaultTo(0);
    table.string("last_logged_in");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
}
