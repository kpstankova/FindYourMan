import { Model } from "objection"
import User from './User'
import { mapDateToSqlDate } from '../utils/dateMapper'

export default class Transaction extends Model {
    transaction_id?: number;
    credit: string;
    debit: string;
    amount: number;
    timestamp?: string;

    static tableName = "transaction";

    static jsonSchema = {
        type: "object",
        required: ["credit", "debit", "amount"],
        properties: {
            transaction_id: { type: "integer" },
            credit: { type: "string" },
            debit: { type: "string" },
            amount: { type: "float" },
            timestamp: {
                type: "string",
                default: mapDateToSqlDate(new Date()).toString()
            }
        }
    }

    static relationToUserCredit = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'Transaction.credit',
                to: 'User.iban'

            }
        },
    })

    static relationToUserDebit = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'Transaction.debit',
                to: 'User.iban',
            }
        },
    })

}