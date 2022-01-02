import express from 'express';
import { addService, getService, updateService, deleteService, getAllServices, addReview, getAllServicesByUser } from '../controllers/serviceController';

const serviceRouter = express.Router();


serviceRouter.post('/getByUser', getAllServicesByUser);

serviceRouter.delete('/delete/:id', deleteService);
serviceRouter.post('/add', addService);
serviceRouter.put('/update', updateService);

serviceRouter.post('/review', addReview);

serviceRouter.get('/', getAllServices);
serviceRouter.get('/:id', getService);

export default serviceRouter;


