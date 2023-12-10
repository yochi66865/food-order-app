import { SyntheticEvent } from "react";

export interface InputData {
  id: string;
  type: "email" | "number" | "text";
  value: number;
  label: string;
  min: number;
  max: number;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
}
