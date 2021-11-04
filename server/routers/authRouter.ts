import express from 'express'
import {changePassword, editInfo, deleteUser} from '../controllers/authController';

const router = express.Router();

router.put('/changePassword', changePassword);
router.put('/editInfo', editInfo);
router.delete('/deleteUser', deleteUser);

export default router;