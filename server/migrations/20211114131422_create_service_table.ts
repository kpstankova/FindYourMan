import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("service", (table: Knex.TableBuilder) => {
        table.increments("service_id");
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.enum("category", ["Programming", "Design", "Cooking", "Mechanics", "Maths", "Entertainment"]).notNullable();
        table.string("duration").notNullable();
        table.string("city").notNullable(); // better will be 'region'
        table.integer("contributor_id").unsigned().notNullable().references("user_id").inTable("user");
        table.double("price").notNullable();
        table.string("publish_date").notNullable();    
        table.double("discount").defaultTo(0);        
        table.string("picture");  
        table.float("rating").notNullable().defaultTo(0);
      });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("service");
}
