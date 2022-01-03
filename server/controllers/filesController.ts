import express from 'express';
import Multer from 'multer';
import { AuthenticatedUserRequest } from '../interfaces/authenticatedRequest';
import { Service } from '../models/Service';
import User from '../models/User';
import { createProfileFolder, moveFiles } from '../utils/fileUtils';

function storageUpload() {
    const storage = Multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../images/');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });
    return storage;
}

let Upload = Multer({
    storage: storageUpload(),
});

const uploadProfilePic = async (req: AuthenticatedUserRequest, res: express.Response) => {
    try {
        const newFiles = req.file;
        const to = req.query.id;
        console.log(newFiles);
        createProfileFolder(to, true);
        newFiles.path = await moveFiles(newFiles.originalname, true, to);

        const user = await User.query().select('*').where("user_id", Number(to)).first();
        user.profile_pic = newFiles.path;
        const result = await User.query().update(user).where("user_id", Number(to));
        if (!result) {
            return res.status(400).send("User not found");
        }
        
        return res.status(200).send(newFiles);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    } 
}

const uploadServicePic = async (req: AuthenticatedUserRequest, res: express.Response) => {
    try {
        const newFiles = req.file;
        const to = req.query.id;

        createProfileFolder(to, false);
        newFiles.path = await moveFiles(newFiles.originalname, false, to);

        const service = await Service.query().select('*').where("service_id", Number(to)).first();
        service.picture = newFiles.path;
        const result = await Service.query().update(service).where("service_id", Number(to));
        if (!result) {
            return res.status(400).send("Service not found");
        }
        
        return res.status(200).send(newFiles);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    } 
}

export {uploadProfilePic, Upload, uploadServicePic};