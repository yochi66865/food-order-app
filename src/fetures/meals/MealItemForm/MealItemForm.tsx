import { SyntheticEvent, useState } from "react";
import { Input } from "../../../shared/Input/Input";
import classes from "./MealItemForm.module.css";

export const MealItemForm = ({
  amount,
  addToCart,
}: {
  amount: number;
  addToCart: (amount: number) => void;
}) => {
  const [amountMeal, changeAmountMeal] = useState(amount);

  const onSubmit = (submitEvent: SyntheticEvent) => {
    submitEvent.preventDefault();
    addToCart(amountMeal);
  };

  const changeAmount = (event: SyntheticEvent<HTMLInputElement>) => {
    changeAmountMeal(+(event.target as HTMLInputElement).value);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Input
        inputData={{
          id: "amount",
          type: "number",
          value: amountMeal,
          label: "Amount",
          onChange: changeAmount,
        }}
      ></Input>
      <button type="submit">+Add</button>
    </form>
  );
};
