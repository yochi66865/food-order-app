import { Meal, User, Order, Queries, LoginUser } from "models";
import { Client } from "pg";

export const queries: Queries = {
  signIn(client: Client, userLogin: LoginUser) {
    return new Promise((resolve, reject) => {
      client.query(
        `SELECT * from users where email = $1 and password = $2`,
        [userLogin.email, userLogin.password],
        (err, result) => {
          if (!err) {
            if ((result.rows[0] as User)?.id) {
              resolve(result.rows[0]);
            } else {
              reject(new Error("user is not exists, please sign up"));
            }
          } else {
            reject(err);
          }
        }
      );
    });
  },

  signUp(client: Client, user: User) {
    return new Promise((resolve, reject) => {
      client.query(
        `insert into users (fname,lname,email,password,tel,address) 
        values ($1, $2, $3, $4, $5, $6)  RETURNING *`,
        [
          user.fname,
          user.lname,
          user.email,
          user.password,
          user.tel,
          user.address,
        ],
        (err, result) => {
          if (!err) {
            resolve(result.rows[0]);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  selectMeals(client: Client) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT * from meals`, [], (err, result) => {
        if (!err) {
          resolve(result.rows as Meal[]);
        } else {
          reject(err);
        }
      });
    });
  },

  selectOrders(client: Client, userId: string) {
    return new Promise((resolve, reject) => {
      client.query(
        `SELECT * from orders where "userId" = $1`,
        [userId],
        (err, result) => {
          if (!err) {
            resolve(result.rows[0]);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  async dispatchOrder(client: Client, order: Order) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO orders("userId", meals, total) VALUES ($1, $2, $3) RETURNING *`,
        [order.userId, order.meals, order.total],
        (err, result) => {
          if (!err) {
            resolve(result.rows[0]);
          } else {
            reject(err);
          }
        }
      );
    });
  },
};
