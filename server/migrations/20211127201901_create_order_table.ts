import { Knex } from "knex";
import { mapDateToSqlDate, getNextSqlDate } from "../utils/dateMapper";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("order", (table: Knex.TableBuilder) => {
        table.increments("order_id");
        table.integer("service_id").unsigned().notNullable().references("service_id").inTable("service");
        table.integer("user_id").unsigned().notNullable().references("user_id").inTable("user");
        table.string("create_timestamp").notNullable().defaultTo(mapDateToSqlDate(new Date()));
        table.string("end_timestamp").notNullable().defaultTo(getNextSqlDate());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("order");
}

