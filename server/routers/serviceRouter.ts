import express from 'express';
import { addService, getService, updateService, deleteService, getAllServices, addReview, getAllServicesByUser } from '../controllers/serviceController';
import authenticateToken from '../middleware/authenticateToken';

const serviceRouter = express.Router();


serviceRouter.post('/getByUser',authenticateToken , getAllServicesByUser);

serviceRouter.delete('/delete/:id',authenticateToken , deleteService);
serviceRouter.post('/add',authenticateToken , addService);
serviceRouter.put('/update',authenticateToken , updateService);

serviceRouter.post('/review',authenticateToken , addReview);

serviceRouter.get('/',authenticateToken , getAllServices);
serviceRouter.get('/:id',authenticateToken , getService);

export default serviceRouter;


