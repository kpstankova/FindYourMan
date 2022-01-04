import express from 'express';
import { getProfilePic, getServicePic, Upload, uploadProfilePic, uploadServicePic } from '../controllers/filesController';
import { getService } from '../controllers/serviceController';
import authenticateToken from '../middleware/authenticateToken';

const filesRouter = express.Router();

filesRouter.post('/profilePic',authenticateToken , Upload.single('file'), uploadProfilePic);
filesRouter.post('/servicePic',authenticateToken , Upload.single('file'), uploadServicePic);
filesRouter.get('/getProfilePic/:id', authenticateToken, getProfilePic);
filesRouter.get('/getServicePic/:id', authenticateToken, getServicePic);

export default filesRouter;