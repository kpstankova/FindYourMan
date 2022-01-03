import express from 'express';
import { orderByPrice, orderByRating, searchServices } from '../controllers/helperServiceController';

const searchFilterRouter = express.Router();

searchFilterRouter.post('/all', searchServices);
searchFilterRouter.post('/sortByRating', orderByRating);
searchFilterRouter.post('/sortByPrice', orderByPrice);

export default searchFilterRouter;


