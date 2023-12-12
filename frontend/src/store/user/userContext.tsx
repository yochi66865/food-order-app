import {
  Context,
  Dispatch,
  createContext,
  useCallback,
  useReducer,
} from "react";
import { userActions } from "./userActions";
import { UserState, userReducer } from "./userReducer";
import { LoginUser, User } from "models";
import { useRequest } from "../../hooks/useRequest";

export type UserType = {
  signIn: (signInUserDetails: LoginUser) => void;
  signUp: (user: User) => void;
  signOut: () => void;
  getCurrentUser: () => User | null;
};

export const UserContext: Context<UserType> = createContext({
  signIn: (signInUserDetails: LoginUser) => {},
  signUp: (user: User) => {},
  signOut: () => {},
  getCurrentUser: () => ({ id: "111", fname: "Yochi" } as User | null),
});

export const UserContextComponent = (props: { children: any }) => {
  const { isLoading, hasError, sendRequest } = useRequest();
  const [userState, dispatchUserAction]: [UserState, Dispatch<userActions>] =
    useReducer(userReducer, { currentUser: null });

  const signIn = (loginUser: LoginUser) => {
    sendRequest("signIn", {
      method: "POST",
      body: JSON.stringify(loginUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.id) {
          dispatchUserAction({ type: "SIGN_IN", value: { user: response } });
        } else {
          throw new Error("this user is not exists. please sign up");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signUp = (user: User) => {
    sendRequest("signUp", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.id) {
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

  const getCurrentUser = () => {
    return userState.currentUser;
  };

  return (
    <UserContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        getCurrentUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
