import knex, { Knex } from "knex";
import { bcrypt, SALT_ROUNDS } from "../controllers/authController";
import User from "../models/User";

export const SYSTEM_IBAN: string = 'SYSTEM_IBAN';

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
    table.string("iban").notNullable().unique().index();
  }).then(async () => { 
    const hash = await bcrypt.hash("3edc#EDC", await bcrypt.genSalt(SALT_ROUNDS));
    
    await knex("user").insert([
      {email: "find.your.man.project@gmail.com",
      password: hash,
      role: "admin",
      name: "SYS_ADMIN",
      verified: 1,
      iban: SYSTEM_IBAN
    }
  ]);  
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
}