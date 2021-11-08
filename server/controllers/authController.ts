import express from 'express';
import User from '../models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserVerificationService from '../services/UserVerificationService';

const SALT_ROUNDS = 10;
const googleClientID = "24068523687-2fqmc49btjt033ggmp6e5ittqg12g6jg.apps.googleusercontent.com";

export const changePassword = async (req: express.Request, res: express.Response) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(req.body.password, salt);
        const result = await User.query().patch({ password: hash }).where({ email: req.body.email });

        if (!result) {
            return res.status(400).send("User not found");
        }
        return res.status(200).send("Password changed successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

export const editInfo = async (req: express.Request, res: express.Response) => {
    try {
        const user: { name: string, phone: string, vat: string, address: string, profilePic: string } = req.body;
        const result = await User.query().patch(user).where({ email: req.body.email });

        if (!result) {
            return res.status(400).send("User not found");
        }
        return res.status(200).send("Information edited successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const result = await User.query().delete().where({ email: req.body.email });

        if (!result) {
            return res.status(400).send("User not found");
        }
        return res.status(200).send("User deleted successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const resultVerification = await UserVerificationService.verifyNewUser(user);

        if (resultVerification.length != 0)
            return res.status(422).json(resultVerification);

        user.password = hashPassword(user.password);

        await User.query()
            .insert(user);

        return res.status(201).json("Successful registration");

    } catch (err) {
        console.log(err);
        return res.status(422).json(err);
    }
}

export const registerWithGoogle = async (req: Request, res: Response) => {
    try {
        const googleUser: User = req.body;
        const upperLetter = googleUser.email.charAt(0).toUpperCase();

        googleUser.password = upperLetter + googleUser.email.substring(1, googleUser.email.length)+'1!'

        req.body = googleUser;
        return register(req, res);

    } catch (err) {
        console.log(err);
        return res.status(422).json(err);
    }
}

//========= FRONT-END: GOOGLE SING IN/OUT ============
// google sign out
export function onSignIn(googleUser: any) {
    let profile = googleUser.getBasicProfile();
    const googleUserToSend = {
        "email": profile.getEmail(), //can be null
        "role": "",//TO SET
        "name": profile.getName(),
        "profile_pic": profile.getImageUrl() ? profile.getImageUrl() : null,
    }

    return googleUserToSend;
}

export function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        console.log('User signed out.');
    });
}
//=========================

const hashPassword = (pass: string) => {
    return bcrypt.hashSync(pass, SALT_ROUNDS)
}


