import express from 'express';
import { getOrder, getAllOrders, deleteOrder, addOrder, updateOrder } from '../controllers/orderController';
import authenticateToken from '../middleware/authenticateToken';
const orderRouter = express.Router();

orderRouter.get('/',authenticateToken , getAllOrders);
orderRouter.delete('/delete/:id',authenticateToken , deleteOrder);
orderRouter.post('/add',authenticateToken , addOrder);
orderRouter.put('/update',authenticateToken , updateOrder);
orderRouter.get('/:id',authenticateToken , getOrder);

export default orderRouter;