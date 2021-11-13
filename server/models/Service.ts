import { Model } from 'objection';
import User from './User';

export default class Service extends Model {
    service_id: number;
    price: number;
    name: string;
    description: string;
    discount?: number;
    category: ["Programming", "Design", "Cooking", "Mechanics", "Maths", "Entertainment"];
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
            service_id: {type: "integer"},
            price: {type: ["float", "0"]},
            name: {type: "string", minLength: 1, maxLength: 50},
            description: {type: "string", minLength: 1, maxLength: 500},
            discount: {type: ["float", "0"]},
            category: {type: "string"},
            duration: {type: "string"},
            city: {type: "string"},
            picture: {type: ["string", "null"]},
            contributor_id: {type: "integer"},
            rating: {type: ["float", "0"]},
            publish_date: {type: "date"},
        }
    }

    static relationMappings = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'User.user_id',
                to: 'Service.contributor_id'
            }
        }
    })
}