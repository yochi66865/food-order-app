import { Order, User } from "models";
import { userActions } from "./userActions";

export type UserState = {
  currentUser: User | null;
  orders: Order[] | null;
};

export const userReducer: (
  state: UserState,
  action: userActions
) => UserState = (state: UserState, action: userActions) => {
  switch (action.type) {
    case "SIGN_IN": {
      const { user } = action.value;
      return { currentUser: user, orders: [] };
    }
    case "SIGN_OUT": {
      return { currentUser: null, orders: null };
    }
    case "FETCH_ORDERS": {
      const { orders } = action.value ?? [];
      return { ...state, orders };
    }
    case "SET_NEW_ORDER": {
      const { order } = action.value;
      return {
        ...state,
        orders: [order].concat(...(state.orders ?? [])),
      };
    }
  }
};
