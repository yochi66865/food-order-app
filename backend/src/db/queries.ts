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
        `SELECT * from orders where "userId" = $1 order by "orderDate" desc`,
        [userId],
        (err, result) => {
          if (!err) {
            resolve(result.rows);
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
        `INSERT INTO orders("userId", meals, total, "orderDate", status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          order.userId,
          JSON.stringify(order.meals),
          order.total,
          order.orderDate,
          order.status,
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
};
