import express from 'express'
import {changePassword, editInfo, deleteUser} from '../controllers/authController';

const authRouter = express.Router();

authRouter.put('/changePassword', changePassword);
authRouter.put('/editInfo', editInfo);
authRouter.delete('/deleteUser', deleteUser);


export default authRouter;