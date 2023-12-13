import { SyntheticEvent } from "react";
export interface InputData {
  id: string;
  type: "email" | "number" | "text" | "password";
  value: number | string;
  label: string;
  min?: number;
  max?: number;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  onBlur?: (event: SyntheticEvent<HTMLInputElement>) => void;
}
