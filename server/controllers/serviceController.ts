import Service from '../models/Service';
import { Request, Response } from 'express';

const deleteService = async (req: Request, res: Response) => {
    try {
        await Service.query().where('service_id', req.params.id).delete();
        return res.status(200).json("Successfully deleted service.");
    } catch (err) {
        res.status(400).json("Deleting service failed." + err);
    }
}

const updateService = async (req: Request, res: Response) => {
    try {
        const serviceId: Service = req.body.service_id;

        if (!await Service.query().select('*').where('service_id', serviceId)) {
            return res.status(404).json("Service not found.");
        }

        req.body.publish_date = mapDateToSqlDate(req.body.publish_date);
        const service: Service = req.body;

        await Service.query().update(service).where('service_id', serviceId);
        return res.status(200).json("Successfully updated service.")

    } catch (err) {
        return res.status(400).json("Updating service failed" + err);
    }
}

const getService = async (req: Request, res: Response) => {
    try {
        const services = await Service.query().select('*').where('service_id', req.params.id);

        if (!services[0]) {
            return res.status(404).json("Service not found.");
        }

        return res.status(200).json(services[0]);

    } catch (err) {
        return res.status(400).json(err);
    }
}

const addService = async (req: Request, res: Response) => {
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

        return res.status(201).json("Service added successfully.");
    } catch (err) {
        res.status(422).json("Adding new service failed:" + err);
    }
}


const mapDateToSqlDate = (date: Date) => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export { addService, deleteService, updateService, getService };