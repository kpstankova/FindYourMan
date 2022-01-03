import express from 'express';
import { Upload, uploadProfilePic, uploadServicePic } from '../controllers/filesController';

const filesRouter = express.Router();

filesRouter.post('/profilePic', Upload.single('file'), uploadProfilePic);
filesRouter.post('/servicePic', Upload.single('file'), uploadServicePic);

export default filesRouter;