import express from 'express';
import { addService, getService, updateService, deleteService, getAllServices } from '../controllers/serviceController';

const serviceRouter = express.Router();

serviceRouter.get('/:id', getService);
serviceRouter.get('/', getAllServices);
serviceRouter.delete('/delete/:id', deleteService);
serviceRouter.post('/add', addService);
serviceRouter.put('/update', updateService);

export default serviceRouter;


