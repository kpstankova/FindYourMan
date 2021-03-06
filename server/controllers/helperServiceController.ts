import Express from 'express';
import Knex from 'knex';
import {Service} from '../models/Service';
import config from '../knexfile';
import { AuthenticatedUserRequest } from '../interfaces/authenticatedRequest';

// {
//     "name": "name",
//     "description": "",
//     "category": "Maths",
//     "duration": "",
//     "city": "",
//     "contributor_id": "",
//     "minPrice": "",
//     "maxPrice": "",
//     "rating": ""
// }

const services = async (req: AuthenticatedUserRequest, res: Express.Response) => {
    try {
        const minPrice = req.body.minPrice != "" ? parseFloat(req.body.minPrice) : 0;
        const maxPrice = req.body.maxPrice != "" ? parseFloat(req.body.maxPrice) : Number.MAX_VALUE;
        const rating = req.body.rating != "" ? parseFloat(req.body.rating) : 0;
        const services = await Service.query().where("name", "like", `%${req.body.searchString}%`).
                                                orWhere("description", "like", `%${req.body.searchString}%`).
                                                orWhere("category", "like", `%${req.body.searchString}%`).
                                                orWhere("city", "like", `%${req.body.searchString}%`);
        console.log(services);
        return services;
    } catch (err) { 
        return null;
    }
};

const searchServices = async (req: AuthenticatedUserRequest, res: Express.Response) => {//1y2m5w3d5h, 0y0m4w0d0h
    try {
        const result = await services(req, res);
        if (result) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send("No services with these filters");
        }
    } catch (err) { 
        console.log(err);
        res.status(400).send(err);
    }
};

const orderByRating = async (req: AuthenticatedUserRequest, res: Express.Response) => {
    try {
        const result = await services(req, res);
        if (result) {
            return res.status(200).send(result.sort((r1, r2) => req.body.order ? r2.rating - r1.rating : r1.rating - r2.rating));
        } else {
            return res.status(404).send("No services with these filters");
        }
    } catch (err) { 
        console.log(err);
        res.status(400).send(err);
    }
};

const orderByPrice = async (req: AuthenticatedUserRequest, res: Express.Response) => {
    try {
        try {
            const result = await services(req, res);
            if (result) {
                return res.status(200).send(result.sort((r1, r2) => req.body.order ? r2.price - r1.price : r1.price - r2.price));
            } else {
                return res.status(404).send("No services with these filters");
            }
        } catch (err) { 
            console.log(err);
            res.status(400).send(err);
        }
    } catch (err) { 
        console.log(err);
        res.status(400).send(err);
    }
};

export {searchServices, orderByRating, orderByPrice};