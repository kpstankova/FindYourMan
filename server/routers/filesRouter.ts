import express from 'express';
import { getProfilePic, getServicePic, Upload, uploadProfilePic, uploadServicePic } from '../controllers/filesController';
import { getService } from '../controllers/serviceController';
import authenticateToken from '../middleware/authenticateToken';

const filesRouter = express.Router();

filesRouter.get('/getProfilePic/:id', authenticateToken, getProfilePic);
filesRouter.get('/getServicePic/:id', authenticateToken, getServicePic);
filesRouter.post('/profilePic' , Upload.single('file'), uploadProfilePic);
filesRouter.post('/servicePic' , Upload.single('file'), uploadServicePic);

export default filesRouter;