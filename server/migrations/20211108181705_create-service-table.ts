import { Knex } from "knex";
import User from '../models/User';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("service", (table: Knex.TableBuilder) => {
        table.increments("service_id");
        table.double("price").notNullable();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.double("discount").defaultTo(0);
        table.enum("category", ["Programming", "Design", "Cooking", "Mechanics", "Maths", "Entertainment"]).notNullable();
        table.string("duration").notNullable();
        table.string("city").notNullable(); // better will be 'region'
        table.string("picture");
        table.integer("contributor_id").unsigned().notNullable().references("user_id").inTable("user");
        table.float("rating").notNullable().defaultTo(0);
        table.timestamp("publish_date").notNullable().defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("service");
}

