import express from "express";
import { payment } from "../controllers/paymentController";
import authenticateToken from "../middleware/authenticateToken";
const paymentRouter = express.Router();

paymentRouter.post("/", authenticateToken, payment);
paymentRouter.get("/success"); // >>  The end point to which the user will be redirected if success.
paymentRouter.get("/cancel"); // >> The end point to which the user will be redirected if cancelation.

export { paymentRouter };
