import { Model } from 'objection';
import User from './User';

export default class Service extends Model {
    service_id: number;
    name: string;
    description: string;
    category: ["Programming", "Design", "Cooking", "Mechanics", "Maths", "Entertainment"];
    duration: string;
    city: string;
    contributor_id: number;
    price: number;
    publish_date: Date; 
    discount?: number; 
    picture?: string;
    rating?: number;

    static tableName = "service";

    static jsonSchema = {
        type: "object",
        required: ["price", "name", "description", "category", "duration", "city", "contributor_id"],
        properties: {
            service_id: {type: "integer"},
            name: {type: "string", 
                    minLength: 1, 
                    maxLength: 50},
            description: {type: "string", 
                            minLength: 1, 
                            maxLength: 500},
            duration: {type: "string"},
            category: {type: "string", 
                        enum: ["Programming", "Design", "Cooking", "Mechanics", "Maths", "Entertainment"]},
            city: {type: "string"},
            contributor_id: {type: "integer"},
            price: {type: ["float", "0"]},           
            publish_date: {type: "date"},          
            discount: {type: ["float", "0"]},          
            picture: {type: ["string", "null"]},          
            rating: {type: ["float", "0"]},
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