import express from 'express';
import { getOrder, getAllOrders, deleteOrder, addOrder, updateOrder } from '../controllers/orderController';
const orderRouter = express.Router();

orderRouter.get('/:id', getOrder);
orderRouter.get('/', getAllOrders);
orderRouter.delete('/delete/:id', deleteOrder);
orderRouter.post('/add', addOrder);
orderRouter.put('/update', updateOrder);

export default orderRouter;