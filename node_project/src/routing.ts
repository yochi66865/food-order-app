import express from "express";
import bodyParser from "body-parser";
import { Client } from "pg";
import { queries } from "./db/queries";
import { Meal, Order, User } from "./models";
const app = express();
const port = 3001;

export const start = (client: Client) => {
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    next();
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/signIn", (req, res) => {
    const loginUser = req.body as Pick<User, "email" | "password">;
    queries
      .signIn(client, loginUser)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.statusCode = 401;
        res.send(err.message);
      });
  });

  app.post("/signUp", (req, res) => {
    const user = req.body as User;
    queries
      .signUp(client, user)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.statusCode = 401;
        res.send(err.message);
      });
  });

  app.get("/selectMeals", (_, res) => {
    queries.selectMeals(client).then((result) => {
      res.send(result);
    });
  });

  app.post("/selectOrders", (req, res) => {
    const { userId } = req.body as { userId: string };
    queries.selectOrders(client, userId).then((result) => {
      res.send(result);
    });
  });

  app.post("/dispatchOrder", async (req, res) => {
    const order: Order = req.body as Order;
    queries.dispatchOrder(client, order).then((result) => {
      res.send(result);
    });
  });

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
};
