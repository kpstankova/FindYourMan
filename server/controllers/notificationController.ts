import { Request, Response } from 'express';
import { bcrypt, SALT_ROUNDS } from './authController';
import nodemailer from 'nodemailer';
import User from '../models/User';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'find.your.man.project@gmail.com',
        pass: '3edc#EDC'
    }
});

interface MailDetails {
    from: 'find.your.man.project@gmail.com',
    to: string,
    subject: string,
    text?: string,
    html?: string
}

const sendForgotPasswordEmail = async (req: Request, res: Response) => {
    const newPass = Math.random().toString(36).slice(-8);
    const details: MailDetails = addDetails(req.body.to, "FYM Forgot Password",
        `<h1 style="text-align:center">Your new password is configured:</h1>` +
        `<h3 style="text-align:center">${newPass}</h3> ` +
        `<p style="text-align:center">Please use it next time you log in!</p>`);
   
        const hash = await bcrypt.hash(newPass, await bcrypt.genSalt(SALT_ROUNDS));
        if (!await User.query().patch({ password: hash }).where({ email: req.body.to })) {
            return res.status(400).json('Message not sent! User not found!');
        }
        sendMail(details, res);
}

const sendVerificationEmail = async (req: Request, res: Response) => {
    // TO DO!
    const code = 'FYM';

    const details: MailDetails = addDetails(req.body.to, "FYM Account Verification",
        `<h1 style="text-align:center">Please click the verification code below: </h1><p>${code}</p>`)

    sendMail(details, res);
}

const addDetails = (to: string, subject: string, html: string) => {
    const details: MailDetails = {
        from: 'find.your.man.project@gmail.com',
        to: to,
        subject: subject,
        html: html
    }

    return details;
}

const sendMail = async (details: MailDetails, res: Response) => {
    transporter.sendMail(details, (error, info) => {
        if (error) {
            res.status(400).json('Message not sent: ' + error);
        }
        else {
            res.status(200).json('Message sent: ' + info.response);
        }
    });
}

export { sendForgotPasswordEmail, sendVerificationEmail };