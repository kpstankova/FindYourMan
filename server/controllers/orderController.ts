import Order from '../models/Order';
import { Request, Response } from 'express';
import { mapDateToSqlDate } from '../utils/dateMapper'

const deleteOrder = async (req: Request, res: Response) => {
    try {
        await Order.query().where('order_id', req.params.id).delete();
        return res.status(200).json("Successfully deleted order.");
    } catch (err) {
        res.status(400).json("Deleting order failed." + err);
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderId: Order = req.body.order_id;

        if (!await Order.query().select('*').where('order_id', orderId)) {
            return res.status(404).json("Order not found.");
        }

        req.body.create_timestamp = mapDateToSqlDate(req.body.create_timestamp);
        const order: Order = req.body;

        await Order.query().update(order).where('order_id', orderId);
        return res.status(200).json("Successfully updated order.")

    } catch (err) {
        return res.status(400).json("Updating order failed" + err);
    }
}

const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.query().select('*').where('order_id', req.params.id).first();

        if (!order) {
            return res.status(404).json("Order not found.");
        }

        return res.status(200).json(order);

    } catch (err) {
        return res.status(400).json(err);
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const result: Order[] = await Order.query().select("*");
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(400).json(err);
    }
}


const addOrder = async (req: Request, res: Response) => {
    try {
        req.body.create_timestamp = mapDateToSqlDate(req.body.create_timestamp);

        const order: {
            service_id: number,
            user_id: number,
            end_timestamp?: string,
        } = req.body;

        if (req.body.end_timestamp != null) {
            order.end_timestamp = mapDateToSqlDate(req.body.end_timestamp).toString();
        }

        await Order.query().insert(order);

        return res.status(201).json("Order added successfully.");
    } catch (err) {
        res.status(422).json("Adding new order failed:" + err);
    }
}

export { addOrder, deleteOrder, updateOrder, getAllOrders, getOrder };