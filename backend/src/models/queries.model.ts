import { Client } from "pg";
import { Meal, Order, User } from "../../../libreries/models";

export interface Queries {
  signIn: (
    client: Client,
    userLogin: Pick<User, "email" | "password">
  ) => Promise<User>;
  signUp: (client: Client, user: User) => Promise<User>;
  selectMeals: (client: Client) => Promise<Meal[]>;
  selectOrders: (client: Client, userId: string) => Promise<Order[]>;
  dispatchOrder: (client: Client, order: Order) => Promise<Order>;
}
