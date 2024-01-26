import { Meal, mealInOrder } from "models";
import classes from "./MealsInOrder.module.css";
import { useContext, memo } from "react";
import { MealsContext } from "../../../../../store/meals/mealsContext";
import { MealDetails } from "../../../../../shared/MealDetails/MealDetails";

export const MealsInOrder = memo(({ meals }: { meals: mealInOrder[] }) => {
  const mealsCtx = useContext(MealsContext);
  const mealsMap: { [id: string]: Meal } = mealsCtx.getMealsMap();

  return (
    <div className={classes.meals}>
      {meals.map((meal) => {
        const currentMeal = mealsMap[meal.mealId];
        return (
          <MealDetails
            meal={currentMeal}
            amount={meal.amount}
            className={classes["meal-item"]}
          ></MealDetails>
        );
      })}
    </div>
  );
});
