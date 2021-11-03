import express, { Application } from "express";
import Knex from "knex";
import { Model } from "objection";
import config from "./knexfile";
import User from "./models/User";

const app: Application = express();
const port = 3001;

const knex = Knex(config);
Model.knex(knex);

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

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
