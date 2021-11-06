import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const changePassword = async (req: express.Request, res: express.Response) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(req.body.password, salt);
        const result = await User.query().patch({password: hash}).where({email: req.body.email});

        if(!result) {
            return res.status(400).send("User not found");
        }
        return res.status(200).send("Password changed successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const editInfo = async (req: express.Request, res: express.Response) => {
    try {
        const user: {name: string, phone: string, vat: string, address: string, profilePic: string} = req.body;
        const result = await User.query().patch(user).where({email: req.body.email});

        if(!result) {
            return res.status(400).send("User not found");
        }
        return res.status(200).send("Information edited successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const result = await User.query().delete().where({email: req.body.email});

        if(!result) {
            return res.status(400).send("User not found");
        }
        return res.status(200).send("User deleted successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

export {changePassword, editInfo, deleteUser};