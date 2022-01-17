import express from 'express';
import { getOrder, getAllOrders, deleteOrder, addOrder, updateOrder, getOrdersByUserId } from '../controllers/orderController';
import authenticateToken from '../middleware/authenticateToken';
const orderRouter = express.Router();

orderRouter.get('/',authenticateToken , getAllOrders);
orderRouter.delete('/delete/:id',authenticateToken , deleteOrder);
orderRouter.post('/add',authenticateToken , addOrder);
orderRouter.put('/update',authenticateToken , updateOrder);
orderRouter.get('/:id',authenticateToken , getOrder);
orderRouter.get('/getAll/:id', authenticateToken, getOrdersByUserId);

export default orderRouter;