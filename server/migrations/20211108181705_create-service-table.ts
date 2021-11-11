import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("service", (table: Knex.TableBuilder) => {
        table.increments("service_id");
        table.double("price").notNullable();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.double("discount").defaultTo(0);
        table.string("category").notNullable(); //table.enum(...) може да го направим с enum и просто да имаме няколко варианта
        table.string("duration").notNullable();
        table.string("city").notNullable(); // better will be 'region'
        table.string("picture");
        table.integer("contributor_id").index().references('id').inTable('User').notNullable();
        table.float("rating").notNullable().defaultTo(0);
        table.string("publish_date").notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("service");
}

