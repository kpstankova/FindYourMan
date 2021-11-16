import { Model } from "objection";

export default class User extends Model {
  user_id: number;
  email: string;
  password: string;
  role: string;
  name?: string;
  phone?: string;
  vat?: string;
  address?: string;
  profile_pic?: string;
  verified?: number;
  rating?: number;
  lastLoggedIn?: string;

  static tableName = "user";

  static jsonSchema = {
    type: "object",
    required: ["email", "password", "role"],

    properties: {
      user_id: { type: "integer" },
      email: { type: "string", 
                unique: true, minLength: 1, 
                maxLength: 128 },
      password: { type: "string" },
      role: { type: "string", 
              enum: ["freelancer", "client", "company"], 
              default: "client" },
      name: { type: "string", 
              minLength: 1 },
      phone: { type: "string",
                unique: true },
      vat: { type: "string",
              unique: true },
      address: { type: "string" },
      profile_pic: { type: "string" },
      verified: { type: "integer" },
      rating: { type: "float" },
      last_logged_in: { type: "string" },
    },
  };
}
