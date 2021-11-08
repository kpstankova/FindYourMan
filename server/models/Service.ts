import { Model } from 'objection';

export default class Service extends Model {
    price: number;
    name: string;
    description: string;
    discount?: number;
    category: string;
    duration: string;
    city: string;
    picture?: string;
    contributor_id: number;
    rating?: number;
    publish_date: Date;

    static tableName = "service";

    static jsonSchema = {
        type: "object",
        required: ["price", "name", "description", "category", "duration", "city", "contributor_id"],
        properties: {
            price: {type: "float"},
            name: {type: "string"},
            description: {type: "string"},
            discount: {type: "float"},
            category: {type: "string"},
            duration: {type: "string"},
            city: {type: "string"},
            picture: {type: "string"},
            contributor_id: {type: "integer"},
            rating: {type: "float"},
            publish_date: {type: "date"},
        }
    }
}