import { User } from "models";
import { userActions } from "./userActions";

export type UserState = {
  currentUser: User | null;
};

export const userReducer: (
  state: UserState,
  action: userActions
) => UserState = (state: UserState, action: userActions) => {
  switch (action.type) {
    case "SIGN_IN": {
      const { user } = action.value;
      return { currentUser: user };
    }
    case "SIGN_OUT": {
      return { currentUser: null };
    }
  }
};
