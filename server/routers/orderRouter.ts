import express from 'express';
import { getOrder, getAllOrders, deleteOrder, addOrder, updateOrder } from '../controllers/orderController';
const orderRouter = express.Router();

orderRouter.get('/', getAllOrders);
orderRouter.delete('/delete/:id', deleteOrder);
orderRouter.post('/add', addOrder);
orderRouter.put('/update', updateOrder);
orderRouter.get('/:id', getOrder);

export default orderRouter;