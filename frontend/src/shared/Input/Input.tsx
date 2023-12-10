import { InputData } from "models";
import classes from "./Input.module.css";

export const Input = ({ inputData }: { inputData: InputData }) => {
  return (
    <div className={classes.input}>
      <label htmlFor={inputData.id}>{inputData.label}</label>
      <input
        id={inputData.id}
        type={inputData.type}
        value={inputData.value}
        min={inputData.min}
        max={inputData.max}
        onChange={inputData.onChange}
      />
    </div>
  );
};
