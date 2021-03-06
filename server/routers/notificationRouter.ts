import express from 'express'
import {sendForgotPasswordEmail, sendVerificationEmail,verifyAccount} from '../controllers/notificationController'
const notificationRouter = express.Router();

notificationRouter.post('/forgotPassword',sendForgotPasswordEmail);
notificationRouter.post('/verification',sendVerificationEmail);
notificationRouter.get('/verifyAccount/:email', verifyAccount);

export default notificationRouter;