import { useContext, useEffect, useState } from "react";
import { DUMMY_MEALS } from "../../assets/dummy-meals";
import { Meal } from "../../models/meal.model";
import { Card } from "../../shared/Card/Card";
import { CartContext, MealInCart } from "../../store/cart/cartContext";
import classes from "./AvailableMeals.module.css";
import { MealItem } from "./MealItem/MealItem";

export const AvailableMeals = () => {
  const cartCtx = useContext(CartContext);
  const mealsInCart = cartCtx.getMapMeals();
  const meals: Meal[] = DUMMY_MEALS;
  const [mealsData, setMealsData] = useState([] as MealInCart[]);

  useEffect(() => {
    setMealsData(
      meals.map((meal) => {
        const mealInCart = mealsInCart[meal.id];
        return { ...meal, amount: mealInCart?.amount ?? 0 };
      })
    );
  }, [cartCtx]);

  const addToCart = (mealData: MealInCart) => {
    cartCtx.addMeal(mealData);
  };

  return (
    <Card className={classes.meals}>
      <ul className="meals">
        {mealsData.map((mealData) => (
          <li key={mealData.id}>
            <MealItem mealData={mealData} addToCart={addToCart} />
          </li>
        ))}
      </ul>
    </Card>
  );
};
