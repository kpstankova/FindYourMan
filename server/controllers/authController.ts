import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../utils/generateAccessToken';
import BlackList from '../models/BlackList';
import { AuthenticatedUserRequest } from '../interfaces/authenticatedRequest';

const SALT_ROUNDS = 10;

const changePassword = async (req: AuthenticatedUserRequest, res: express.Response) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(req.body.password, salt);
        const result = await User.query().patch({ password: hash }).where({ email: req.user.email });

        if (!result) {
            return res.status(400).send("User not found");
        }
        return res.status(200).send("Password changed successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const editInfo = async (req: AuthenticatedUserRequest, res: express.Response) => {
    console.log(req.body);
    try {
        const user: { name: string, phone: string, vat: string, address: string, profilePic: string } = req.body;
        const result = await User.query().patch(user).where({ email: req.user.email });

        if (!result) {
            return res.status(400).send("User not found");
        }
        return res.status(200).send("Information edited successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const deleteUser = async (req: AuthenticatedUserRequest, res: express.Response) => {
    try {
        const result = await User.query().delete().where({ email: req.user.email });

        if (!result) {
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

        const result = await User.query()
            .insert(user);

        if (!result) {
            return res.status(400).send("Registration failed.");
        }

        return res.status(201).json("Successful registration");

    } catch (err) {
        console.log(err);
        return res.status(422).json("Registration failed:" + err);
    }
}

const loginWithGoogle = async (req: express.Request, res: express.Response) => {
    try {
        const googleUser: User = req.body;
        googleUser.password = googleUser.email;
        const user: User = await User.query().select('password').where('email', googleUser.email).first();

        if (!user) {
            req.body = googleUser;
            return register(req, res);
        }

        if (!comparePass(googleUser.password, user.password)) {
            return res.status(401).json("Invalid password");
        }

        return res.status(200).json("Successful login");


    } catch (err) {
        console.log(err);
        return res.status(422).json(err);
    }
}

const googleSignOut = (req: express.Request, res: express.Response) => {
    try {
        gapi.auth2.getAuthInstance().signOut();
        return res.status(200).json("User signed out.")
    }
    catch (err) {
        console.log('err');
    }
}

const hashPassword = (pass: string) => {
    return bcrypt.hashSync(pass, SALT_ROUNDS)
}

const comparePass = (plainPass: string, hashedPass: string) => {
    return bcrypt.compareSync(plainPass, hashedPass);
}

const login = async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.query().select('*').where({email: req.body.email}).first()
        if (!user) {
            return res.status(400).json({message: "User does not exists"});
        }
        const passwordMatches = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatches){
            return res.status(400).json({message: "Wrong password"});
        } 
        const accessToken = generateAccessToken({
            email: user.email
        })
        return res.status(200).json({accessToken: accessToken});

    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const logout = async (req: express.Request, res: express.Response) => {
    if (!req.body.token) {
        return res.status(400).send('Token missing');
    }
    try{
        let token: BlackList = req.body;
        await BlackList.query().insert(token);
        return res.status(204).json({message: "Logout"});
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}
//========= FRONT-END: GOOGLE SING IN/OUT ============
// function onSignIn(googleUser: any) {
//     let profile = googleUser.getBasicProfile();
//     const googleUserToSend = {
//         "email": profile.getEmail(), //can be null
//         "role": "",//TO SET
//         "name": profile.getName(),
//         "profile_pic": profile.getImageUrl() ? profile.getImageUrl() : null,
//     }

//     return googleUserToSend;
// }

export { changePassword, editInfo, deleteUser, register, loginWithGoogle, googleSignOut, login, logout, SALT_ROUNDS, bcrypt };