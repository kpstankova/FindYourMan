import express from 'express';
import { addService, getService, updateService, deleteService, getAllServices, addReview, getAllServicesByUser } from '../controllers/serviceController';

const serviceRouter = express.Router();

serviceRouter.get('/:id', getService);
serviceRouter.get('/', getAllServices);
serviceRouter.get('/getByUser', getAllServicesByUser);
serviceRouter.delete('/delete/:id', deleteService);
serviceRouter.post('/add', addService);
serviceRouter.put('/update', updateService);


serviceRouter.post('/review', addReview);

export default serviceRouter;


