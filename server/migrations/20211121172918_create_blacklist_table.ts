import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("blacklist", (table: Knex.TableBuilder) => {
        table.string("token").notNullable();
      });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("blacklist");
}