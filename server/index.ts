import express, { Application } from "express";
import Knex from "knex";
import { Model } from "objection";
import config from "./knexfile";
import User from "./models/User";
import authRouter from './routers/authRouter';
import notificationRouter from "./routers/notificationRouter";
import serviceRouter from "./routers/serviceRouter";

const app: Application = express();
export const port = 3001;

const knex = Knex(config);
Model.knex(knex);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.get("/user", async (req, res) => {
  const users = await User.query().select("*");
  console.log(users);
  res.status(200).send("Okay");
});

app.post("/user", async (req, res) => {
  try {
    await User.query().insert({
      email: "testemail@gmail.com",
      password: "sbycryptpolzvai",
      role: "nekavtam",
    });
    res.status(200).send("auf");
  } catch (err) {
    console.log(err);
  }
});

app.use('/auth', authRouter);
app.use('/service', serviceRouter);
app.use('/email', notificationRouter)

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});