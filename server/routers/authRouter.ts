import express from 'express'
import {changePassword, editInfo, deleteUser,registerWithGoogle,register} from '../controllers/authController';

const authRouter = express.Router();

authRouter.put('/changePassword', changePassword);
authRouter.put('/editInfo', editInfo);
authRouter.delete('/deleteUser', deleteUser);

authRouter.post('/register', register);
authRouter.post('/register/google', registerWithGoogle);


export default authRouter;