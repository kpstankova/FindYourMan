import express from 'express';
import { orderByPrice, orderByRating, searchServices } from '../controllers/helperServiceController';

const searchFilterRouter = express.Router();

searchFilterRouter.get('/all', searchServices);
searchFilterRouter.get('/sortByRating', orderByRating);
searchFilterRouter.get('/sortByPrice', orderByPrice);

export default searchFilterRouter;


