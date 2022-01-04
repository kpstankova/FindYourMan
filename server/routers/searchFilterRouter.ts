import express from 'express';
import { orderByPrice, orderByRating, searchServices } from '../controllers/helperServiceController';
import authenticateToken from '../middleware/authenticateToken';

const searchFilterRouter = express.Router();

searchFilterRouter.post('/all',authenticateToken , searchServices);
searchFilterRouter.post('/sortByRating',authenticateToken , orderByRating);
searchFilterRouter.post('/sortByPrice',authenticateToken , orderByPrice);

export default searchFilterRouter;


