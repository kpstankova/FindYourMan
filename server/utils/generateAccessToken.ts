import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const generateAccessToken = (payload: any) => {
   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

export {generateAccessToken};