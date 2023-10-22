import { ChangeEventHandler, SyntheticEvent } from "react";

export interface InputData {
  id: string;
  type: "email" | "number" | "text";
  value: number;
  label: string;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
}
