import { LoginUser, Order, User } from "models";
import { Context, Dispatch, createContext, useReducer } from "react";
import { useRequest } from "../../hooks/useRequest";
import { userActions } from "./userActions";
import { UserState, userReducer } from "./userReducer";

export type UserType = {
  signIn: (signInUserDetails: LoginUser) => void;
  signUp: (user: Omit<User, "id">) => void;
  signOut: () => void;
  getCurrentUser: () => User | null;
  fetchOrders: (userId: string) => void;
  setNewOrder: (order: Order) => void;
  getOrders: () => Order[] | null;
  isLoading: boolean;
};

export const UserContext: Context<UserType> = createContext({
  signIn: (signInUserDetails: LoginUser) => {},
  signUp: (user: Omit<User, "id">) => {},
  signOut: () => {},
  getCurrentUser: () => ({ id: "111", fname: "Yochi" } as User | null),
  fetchOrders: (userId: string) => {},
  setNewOrder: (order: Order) => {},
  getOrders: () => [] as Order[] | null,
  isLoading: false as boolean,
});

export const UserContextComponent = (props: { children: any }) => {
  const { isLoading, hasError, sendRequest } = useRequest();
  const [userState, dispatchUserAction]: [UserState, Dispatch<userActions>] =
    useReducer(userReducer, {
      currentUser: null,
      orders: null,
    });

  const signIn = (loginUser: LoginUser) => {
    sendRequest("signIn", {
      method: "POST",
      body: JSON.stringify(loginUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.id && !hasError) {
          dispatchUserAction({ type: "SIGN_IN", value: { user: response } });
          fetchOrders(response.id);
        } else {
          throw new Error("this user is not exists. please sign up");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signUp = (user: Omit<User, "id">) => {
    sendRequest("signUp", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.id && !hasError) {
          dispatchUserAction({ type: "SIGN_IN", value: { user: response } });
        } else {
          throw new Error("error accurd when try sign up.");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signOut = () => {
    dispatchUserAction({ type: "SIGN_OUT" });
  };

  const fetchOrders = (userId: string) => {
    sendRequest("getOrders", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        let orders = response as Order[];
        if (orders?.length && !hasError) {
          orders = orders.map((order) => ({
            ...order,
            orderDate: new Date(order.orderDate),
          }));
          dispatchUserAction({
            type: "FETCH_ORDERS",
            value: { orders },
          });
        } else {
          throw new Error("error accourd when trying fetch orders from db");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const setNewOrder = (order: Order) => {
    sendRequest("dispatchOrder", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if ((response as Order)?.id && !hasError) {
          dispatchUserAction({
            type: "SET_NEW_ORDER",
            value: { order: response },
          });
        } else {
          throw new Error("error accourd when trying set new order");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getCurrentUser = () => {
    return userState.currentUser;
  };

  const getOrders = () => {
    return userState.orders;
  };

  return (
    <UserContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        getCurrentUser,
        fetchOrders,
        setNewOrder,
        getOrders,
        isLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
