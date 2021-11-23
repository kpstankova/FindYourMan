import { Model } from "objection";

export default class BlackList extends Model {
  token: string;  
  
  static tableName = "blacklist";

  static jsonSchema = {
    type: "object",
    required: ["token"],

    properties: {
      token: { type: "string", 
                minLength: 1, 
                maxLength: 256 }
    }
  };
}
