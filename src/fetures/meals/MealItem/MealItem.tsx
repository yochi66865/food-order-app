import { Meal } from "../../../models/meal.model";
import { Input } from "../../../shared/Input/Input";
import { MealItemForm } from "../MealItemForm/MealItemForm";
import classes from "./MealItem.module.css";

export const MealItem = ({ meal, amount }: { meal: Meal; amount: number }) => {
  const AddToCart = (amount: number) => {
    console.log("AddToCart meal", meal, "amount", amount);
  };

  return (
    <div className={classes.meal}>
      <div className={classes["meal-item"]}>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>${meal.price}</div>
      </div>
      <div className={classes["meal-item-form"]}>
        <MealItemForm amount={amount} addToCart={AddToCart}></MealItemForm>
      </div>
    </div>
  );
};
