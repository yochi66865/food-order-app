import { InputData } from "models";
import classes from "./Input.module.css";
import { SyntheticEvent } from "react";

export const Input = ({ inputData }: { inputData: InputData }) => {
  const onChangeHandler = (event: SyntheticEvent<HTMLInputElement>) => {};
  const onBlurHandler = (event: SyntheticEvent<HTMLInputElement>) => {};

  return (
    <div className={classes.input}>
      <label htmlFor={inputData.id}>{inputData.label}</label>
      <input
        id={inputData.id}
        type={inputData.type}
        value={inputData.value}
        min={inputData.min ?? 0}
        max={inputData.max ?? 100}
        onChange={inputData.onChange ?? onChangeHandler}
        onBlur={inputData.onBlur ?? onBlurHandler}
      />
    </div>
  );
};
