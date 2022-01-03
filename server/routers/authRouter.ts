import express from 'express'
import { changePassword, editInfo, deleteUser, register, loginWithGoogle, googleSignOut, login, logout, getUserById } from '../controllers/authController';
import authenticateToken from '../middleware/authenticateToken';
const authRouter = express.Router();

authRouter.put('/changePassword',authenticateToken, changePassword);
authRouter.put('/editInfo', authenticateToken, editInfo);
authRouter.delete('/deleteUser',authenticateToken, deleteUser);

authRouter.post('/register', register);
authRouter.post('/login/google', loginWithGoogle)
authRouter.post('/logout/google', googleSignOut);

authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.get('/:id', authenticateToken, getUserById);
export default authRouter;