import { mealInOrder } from "models";
import classes from "./mealsDetails.module.css";

export const MealsDetails = ({ meals }: { meals: mealInOrder[] }) => {
  return (
    <div className={classes.meals}>
      {meals.map((meal) => (
        <div className={classes["meal-item"]} key={meal.mealId}>
          <h3 className={classes.mealId}>{meal.mealId}</h3>
          <h5 className={classes.amount}>{meal.amount}</h5>
        </div>
      ))}
    </div>
  );
};
