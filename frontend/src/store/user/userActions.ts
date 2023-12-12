import { User } from "models";

export type signIn = {
  type: "SIGN_IN";
  value: { user: User };
};

export type signOut = {
  type: "SIGN_OUT";
};

export type userActions = signIn | signOut;
