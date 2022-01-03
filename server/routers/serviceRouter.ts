import express from 'express';
import authenticateToken from '../middleware/authenticateToken';
import { addService, getService, updateService, deleteService, getAllServices, addReview, getAllServicesByUser, getAllReviews } from '../controllers/serviceController';

const serviceRouter = express.Router();

serviceRouter.post('/getByUser',authenticateToken , getAllServicesByUser);

serviceRouter.delete('/delete/:id',authenticateToken , deleteService);
serviceRouter.post('/add',authenticateToken , addService);
serviceRouter.put('/update',authenticateToken , updateService);

serviceRouter.post('/review', addReview);
serviceRouter.post('/allReviews', getAllReviews);

serviceRouter.get('/',authenticateToken , getAllServices);
serviceRouter.get('/:id',authenticateToken , getService);

export default serviceRouter;


