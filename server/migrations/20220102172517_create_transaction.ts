import { Knex } from "knex";
import { mapDateToSqlDate } from "../utils/dateMapper";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("transaction", (table: Knex.TableBuilder) => {
        table.increments("transaction_id").primary();
        table.string('credit').notNullable();
        table.string("debit").notNullable();
        table.integer("amount").notNullable();
        table.string("timestamp").notNullable().defaultTo(mapDateToSqlDate(new Date()));

        table.foreign('credit', 'creditFK').references('user.iban').onDelete('CASCADE');
        table.foreign('debit', 'debitFK').references('user.iban').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("transaction");
}

