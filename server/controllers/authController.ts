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


const register = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = req.body;
        user.password = hashPassword(user.password);

        await User.query()
            .insert(user);

        return res.status(201).json("Successful registration");

    } catch (err) {
        console.log(err);
        return res.status(422).json("Registration failed:" + err);
    }
}

const registerWithGoogle = async (req: express.Request, res: express.Response) => {
    try {
        const googleUser: User = req.body;
        googleUser.password = googleUser.email;
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
    gapi.auth2.getAuthInstance().signOut().then(() => {
        console.log('User signed out.');
    });
}
//=========================

const hashPassword = (pass: string) => {
    return bcrypt.hashSync(pass, SALT_ROUNDS)
}

export { changePassword, editInfo, deleteUser, register, registerWithGoogle };