import { Model } from "objection";

import User from './User'
import Service from './Service'
import { mapDateToSqlDate } from "../utils/dateMapper";


export default class Review extends Model {
    review_id: number;
    service_id: number;
    user_id: number;
    comment: string;
    rating?: number;
    publish_date?: string;

    static tableName = "review";

    static jsonSchema = {
        type: "object",
        required: ["service_id", "user_id", "comment"],
        properties: {
            review_id: { type: "integer" },
            service_id: { type: "integer" },
            user_id: { type: "integer" },
            comment: { type: "string" },
            rating: {
                type: "integer",
                default: 0
            },
            publish_date: {
                type: "string",
                default: mapDateToSqlDate(new Date()).toString()
            }
        }
    }

    static relationToUser = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'User.user_id',
                to: 'Review.user_id'
            }
        },
    })

    static relationToService = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: Service,
            join: {
                from: 'Service.service_id',
                to: 'Review.service_id'
            }
        }
    })

}