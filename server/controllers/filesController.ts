import express from 'express';
import Multer from 'multer';
import { createProfileFolder } from '../utils/fileUtils';

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



const createFolder = async (req: express.Request, res: express.Response) => {
    console.log(req.body.folder);
    const result = await createProfileFolder(req.body.folder, true);
    res.json(result);
}

const uploadFiles = async (req: express.Request, res: express.Request) => {
    const newFiles = req.files;
    
}

export {createFolder, uploadFiles};