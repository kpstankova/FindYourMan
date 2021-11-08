import express, { Application } from "express";
import Knex from "knex";
import { Model } from "objection";
import config from "./knexfile";
import mainRouter from './routers/mainRouter';

const app: Application = express();
const port = 3001;

const knex = Knex(config);
Model.knex(knex);

app.use(express.json());

app.use('/', mainRouter);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
