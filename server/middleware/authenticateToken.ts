import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedUserRequest } from '../interfaces/authenticatedRequest';
import BlackList from '../models/BlackList';
import * as dotenv from 'dotenv';
dotenv.config();
        
const authenticateToken = async (req: AuthenticatedUserRequest,res: express.Response,next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ").pop();
    console.log(token);
    if (!token){
        return res.sendStatus(401);
    }
    try {
        const blacklisedToken = await BlackList.query().select('token').where({token: token}).first()
        console.log(blacklisedToken);
        if (blacklisedToken) {
            return res.sendStatus(401);
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = payload;
        })
    } catch (err) {
        return res.status(400).send(err);
    }

    next(); 
}

export = authenticateToken;