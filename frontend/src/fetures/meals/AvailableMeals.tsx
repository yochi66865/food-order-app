import { useCallback, useContext, useEffect, useState } from "react";
import { Meal } from "models";
import { Card } from "../../shared/Card/Card";
import { CartContext, MealInCart } from "../../store/cart/cartContext";
import classes from "./AvailableMeals.module.css";
import { MealItem } from "./MealItem/MealItem";
import { useRequest } from "../../hooks/useRequest";
import { MealsContext } from "../../store/meals/mealsContext";

export const AvailableMeals = () => {
  const cartCtx = useContext(CartContext);
  const mealsCtx = useContext(MealsContext);
  const { getMeals, isLoading } = mealsCtx;
  const mealsInCart = cartCtx.getMapMeals();
  const [mealsData, setMealsData] = useState([] as MealInCart[]);

  const getAvailableMeals = useCallback(async () => {
    const meals = getMeals();
    setMealsData(
      meals.map((meal) => {
        const mealInCart = mealsInCart[meal.id];
        return { meal, amount: mealInCart?.amount ?? 0 };
      })
    );
  }, [getMeals, mealsInCart]);

  useEffect(() => {
    getAvailableMeals();
  }, [getAvailableMeals]);

  const addToCart = (mealData: MealInCart) => {
    cartCtx.addMeal(mealData);
  };

  return (
    <Card className={classes.meals}>
      <ul className="meals">
        {mealsData.map((mealData) => (
          <li key={mealData.meal.id}>
            <MealItem mealData={mealData} addToCart={addToCart} />
          </li>
        ))}
      </ul>
      {isLoading && <span className={classes.loader}></span>}
    </Card>
  );
};
