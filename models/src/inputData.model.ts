import { SyntheticEvent } from "react";
export interface InputData {
  id: string;
  type: "email" | "number" | "text" | "password" | "tel";
  value: number | string;
  label: string;
  min?: number;
  max?: number;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  onBlur?: (event: SyntheticEvent<HTMLInputElement>) => void;
  isRequierd?: boolean;
  error?: errorData;
}

export interface errorData {
  isShowErrorMsg: boolean;
  errorMsg: string;
}
