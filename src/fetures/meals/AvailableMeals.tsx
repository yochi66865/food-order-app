import { DUMMY_MEALS } from "../../assets/dummy-meals";
import { Meal } from "../../models/meal.model";
import { MealItem } from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { Card } from "../../shared/Card/Card";

export const AvailableMeals = () => {
  const meals: Meal[] = DUMMY_MEALS;

  return (
    <Card className={classes.meals}>
      <ul className="meals">
        {meals.map((meal) => (
          <li key={meal.id}>
            <MealItem meal={meal} amount={1} />
          </li>
        ))}
      </ul>
    </Card>
  );
};
