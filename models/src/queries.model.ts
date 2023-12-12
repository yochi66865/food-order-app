import { Client } from "pg";
import { LoginUser, Meal, Order, User } from ".";

export interface Queries {
  signIn: (client: Client, userLogin: LoginUser) => Promise<User>;
  signUp: (client: Client, user: User) => Promise<User>;
  selectMeals: (client: Client) => Promise<Meal[]>;
  selectOrders: (client: Client, userId: string) => Promise<Order[]>;
  dispatchOrder: (client: Client, order: Order) => Promise<Order>;
}
