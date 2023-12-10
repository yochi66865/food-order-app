import { SyntheticEvent, useEffect, useReducer, useState } from "react";
import { Input } from "../../../shared/Input/Input";
import classes from "./MealItemForm.module.css";
import { amountReducer } from "./amount-state/amount.reducer";

export const MealItemForm = ({
  amount,
  addToCart,
}: {
  amount: number;
  addToCart: (amount: number) => void;
}) => {
  const [amountMeal, changeAmountMeal] = useReducer(amountReducer, {
    amount: 0,
    isValid: false,
  });

  useEffect(() => {
    changeAmountMeal({ type: "UPDATE_AMOUNT", amount });
  }, [amount]);

  const onSubmit = (submitEvent: SyntheticEvent) => {
    submitEvent.preventDefault();
    addToCart(amountMeal.amount);
  };

  const changeAmount = (event: SyntheticEvent<HTMLInputElement>) => {
    const amount = +(event.target as HTMLInputElement).value;
    changeAmountMeal({ type: "UPDATE_AMOUNT", amount });
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Input
        inputData={{
          id: "amount",
          type: "number",
          value: amountMeal.amount,
          label: "Amount",
          min: 0,
          max: 5,
          onChange: changeAmount,
        }}
      ></Input>
      <button
        type="submit"
        className={!amountMeal.isValid ? classes.disabled : ""}
      >
        +Add
      </button>
    </form>
  );
};
