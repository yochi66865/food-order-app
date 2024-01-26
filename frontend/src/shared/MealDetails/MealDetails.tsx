import { Meal } from "models";
import classes from "./MealDetails.module.css";

export const MealDetails = ({
  meal,
  amount,
  className = "",
}: {
  meal: Meal;
  amount: number;
  className?: string;
}) => {
  return (
    <div className={`${classes["meal-item"]} ${className}`}>
      <h2>{meal.name}</h2>
      <div className={classes.summary}>
        <label className={classes.price}>${meal.price}</label>
        <div className={classes.amount}>x {amount}</div>
      </div>
    </div>
  );
};
