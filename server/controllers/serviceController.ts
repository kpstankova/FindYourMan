import { Service } from '../models/Service';
import { Request, Response } from 'express';
import { mapDateToSqlDate } from '../utils/dateMapper'
import Review from '../models/Review';
import Order from '../models/Order';
import { AuthenticatedUserRequest } from '../interfaces/authenticatedRequest';
import User from '../models/User';

const deleteService = async (req: AuthenticatedUserRequest, res: Response) => {
    try {
        await Service.query().where('service_id', req.params.id).delete();
        return res.status(200).json("Successfully deleted service.");
    } catch (err) {
        res.status(400).json("Deleting service failed." + err);
    }
}

const updateService = async (req: AuthenticatedUserRequest, res: Response) => {
    try {
        const serviceId: Service = req.body.service_id;

        const dbService:Service = await Service.query().select('*').where('service_id', serviceId).first();
        if (!dbService) {
            return res.status(404).json("Service not found.");
        }

        req.body.publish_date = mapDateToSqlDate(req.body.publish_date);
        const service: Service = req.body;

        if (service.rating) {
            updateRating(service.rating, dbService);
        }

        await Service.query().update(service).where('service_id', serviceId);
        return res.status(200).json("Successfully updated service.")

    } catch (err) {
        return res.status(400).json("Updating service failed" + err);
    }
}

const getService = async (req: AuthenticatedUserRequest, res: Response) => {
    try {
        const service = await Service.query().select('*').where('service_id', req.params.id);
        
        if (!service) {
            return res.status(404).json("Service not found.");
        }

        return res.status(200).json(service);

    } catch (err) {
        return res.status(400).json(err);
    }
}

const getAllServices = async (req: AuthenticatedUserRequest, res: Response) => {
    try {
        const result: Service[] = await Service.query().select("*");
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(400).json(err);
    }
}


const addService = async (req: AuthenticatedUserRequest, res: Response) => {
    try {
        req.body.publish_date = mapDateToSqlDate(req.body.publish_date);

        const service: {
            price: number,
            name: string,
            description: string,
            discount?: number,
            category: string,
            duration: string,
            picture?: string;
            city: string,
            contributor_id: number,
            rating?: number,
            publish_date: Date
        } = req.body;

        await Service.query().insert(service);

        const result = await Service.query().select("*");

        return res.status(201).json(result[result.length - 1]);
    } catch (err) {
        res.status(422).json("Adding new service failed:" + err);
    }
}

const addReview = async (req: AuthenticatedUserRequest, res: Response) => {
    try {
        req.body.publish_date = mapDateToSqlDate(req.body.publish_date);

        const review: {
            service_id: number,
            user_id: number,
            comment: string,
            rating?: number,
            publish_date?: string,
        } = req.body;

        if (await Order.query().select('*').where("user_id", review.user_id)) {
            if (await Review.query().insert(review)) {
                updateRating(review.rating, await Service.query().select("*").where("service_id", req.body.service_id).first())
                return res.status(201).json("Review added successfully.");
            }
        }
        else {
            res.status(422).json("Can not add review, because you have no orders for this service.");
        }
    }
    catch (err) {
        res.status(422).json("Adding review to service failed:" + err);
    }
}

const getAllServicesByUser = async (req: AuthenticatedUserRequest, res: Response) => {
    try {
        const services = await Service.query().select("*").where("contributor_id", req.body.contributor_id);

        if (services.length === 0) {
            return res.status(404).send("No services found");
        }
        return res.status(200).json(services);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.query().select('*').where("service_id", req.body.service_id);
        if(reviews.length === 0) {
            return res.status(404).send("There is no reviews for this service");
        }
        return res.status(200).json(reviews);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

const updateRating = async (newRating: number, dbService: Service) => {
    newRating = (newRating + dbService.rating) / 2;
    let user = await User.query().select("*").where("user_id", dbService.contributor_id).first();
    user.rating = (user.rating + newRating) / 2;
    await User.query().patch(user).where("user_id", dbService.contributor_id);

    dbService.rating = (dbService.rating + newRating) / 2
    await Service.query().patch(dbService).where("service_id", dbService.service_id);
}

export { addService, deleteService, updateService, getService, getAllServices, addReview, getAllServicesByUser, getAllReviews };