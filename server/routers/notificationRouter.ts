import express from 'express'
import {sendForgotPasswordEmail, sendVerificationEmail} from '../controllers/notificationController'
const notificationRouter = express.Router();

notificationRouter.post('/forgotPassword',sendForgotPasswordEmail);
notificationRouter.post('/verification',sendVerificationEmail)

export default notificationRouter;