import express from 'express';
import { createFolder } from '../controllers/filesController';

const filesRouter = express.Router();

filesRouter.post('/createFolder', createFolder);

export default filesRouter;