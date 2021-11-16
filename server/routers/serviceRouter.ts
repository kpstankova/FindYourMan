import express from 'express';
import { addService, getService, updateService, deleteService } from '../controllers/serviceController';

const serviceRouter = express.Router();

serviceRouter.get('/:id', getService);
serviceRouter.delete('/delete/:id', deleteService);
serviceRouter.post('/add', addService);
serviceRouter.put('/update', updateService);

export default serviceRouter;


