import { Address } from ".";

export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  tel: string;
  address: Address;
}

export type LoginUser = Pick<User, "email" | "password">;
