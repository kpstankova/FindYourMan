import { Model } from "objection";
import User from './User'
import Service from './Service'
import { mapDateToSqlDate, getNextSqlDate } from '../utils/dateMapper'

export default class Order extends Model {
    order_id: number;
    service_id: number;
    user_id: number;
    create_timestamp?: string;
    end_timestamp?: string;

    static tableName = "order";

    static jsonSchema = {
        type: "object",
        required: ["service_id", "user_id"],
        properties: {
            order_id: { type: "integer" },
            service_id: { type: "integer" },
            user_id: { type: "integer" },
            create_timestamp: {
                type: "string",
                default: mapDateToSqlDate(new Date()).toString()
            },
            end_timestamp: {
                type: "string",
                default: getNextSqlDate().toString()
            }
        }
    }

    static relationToUser = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'User.user_id',
                to: 'Order.user_id'
            }
        },
    })

    static relationToService = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: Service,
            join: {
                from: 'Service.service_id',
                to: 'Order.service_id'
            }
        }
    })
}



