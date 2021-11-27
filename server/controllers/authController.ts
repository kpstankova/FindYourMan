import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const changePassword = async (req: express.Request, res: express.Response) => {
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

const editInfo = async (req: express.Request, res: express.Response) => {
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

const deleteUser = async (req: express.Request, res: express.Response) => {
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

export { changePassword, editInfo, deleteUser, register, loginWithGoogle, googleSignOut, SALT_ROUNDS, bcrypt };
