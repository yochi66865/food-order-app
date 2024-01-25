import { Order, User } from "models";

export type signIn = {
  type: "SIGN_IN";
  value: { user: User };
};

export type signOut = {
  type: "SIGN_OUT";
};

export type fetchOrders = {
  type: "FETCH_ORDERS";
  value: { orders: Order[] };
};

export type setNewOrder = {
  type: "SET_NEW_ORDER";
  value: { order: Order };
};

export type userActions = signIn | signOut | fetchOrders | setNewOrder;
