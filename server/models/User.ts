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
  lastLoggedIn?: Date;

  static tableName = "user";

  static jsonSchema = {
    type: "object",
    required: ["email", "password", "role"],

    properties: {
      user_id: { type: "integer" },
      email: { type: "string" },
      password: { type: "string" },
      role: { type: "string" },
      name: { type: "string" },
      phone: { type: "string" },
      vat: { type: "string" },
      address: { type: "string" },
      profile_pic: { type: "string" },
      verified: { type: "integer" },
      rating: { type: "float" },
      last_logged_in: { type: "date" },
    },
  };
}
