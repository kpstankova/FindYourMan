import express, { Application } from "express";
import Knex from "knex";
import { Model } from "objection";
import config from "./knexfile";
import User from "./models/User";
import authRouter from "./routers/authRouter";
import notificationRouter from "./routers/notificationRouter";
import serviceRouter from "./routers/serviceRouter";
import searchFilterRouter from "./routers/searchFilterRouter";
import orderRouter from "./routers/orderRouter";
import { paymentRouter } from "./routers/paymentRouter";
import cors from "cors";

const app: Application = express();
export const port = 3001;

const knex = Knex(config);
Model.knex(knex);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.use("/auth", authRouter);
app.use("/service", serviceRouter);
app.use("/email", notificationRouter);
app.use("/search", searchFilterRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
