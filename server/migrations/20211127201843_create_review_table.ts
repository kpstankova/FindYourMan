import { Knex } from "knex";
import { getNextSqlDate, mapDateToSqlDate } from '../utils/dateMapper'


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("review", (table: Knex.TableBuilder) => {
        table.increments("review_id");
        table.integer("service_id").unsigned().notNullable().references("service_id").inTable("service");
        table.integer("user_id").unsigned().notNullable().references("user_id").inTable("user");
        table.string("comment").notNullable();
        table.integer("rating").notNullable().defaultTo(0);
        table.string("publish_date").notNullable().defaultTo(mapDateToSqlDate(new Date()));
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("review");
}

