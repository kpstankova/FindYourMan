import express from 'express';
import { Upload, uploadProfilePic, uploadServicePic } from '../controllers/filesController';
import authenticateToken from '../middleware/authenticateToken';

const filesRouter = express.Router();

filesRouter.post('/profilePic',authenticateToken , Upload.single('file'), uploadProfilePic);
filesRouter.post('/servicePic',authenticateToken , Upload.single('file'), uploadServicePic);

export default filesRouter;