import express from 'express'
import { changePassword, editInfo, deleteUser, register, loginWithGoogle, googleSignOut } from '../controllers/authController';

const authRouter = express.Router();

authRouter.put('/changePassword', changePassword);
authRouter.put('/editInfo', editInfo);
authRouter.delete('/deleteUser', deleteUser);

authRouter.post('/register', register);
authRouter.post('/login/google', loginWithGoogle)
authRouter.post('/logout/google', googleSignOut);
export default authRouter;