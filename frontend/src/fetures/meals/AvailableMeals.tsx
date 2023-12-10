import { useCallback, useContext, useEffect, useState } from "react";
import { Meal } from "models";
import { Card } from "../../shared/Card/Card";
import { CartContext, MealInCart } from "../../store/cart/cartContext";
import classes from "./AvailableMeals.module.css";
import { MealItem } from "./MealItem/MealItem";
import { useRequest } from "../../hooks/useRequest";

export const AvailableMeals = () => {
  const { isLoading, hasError, sendRequest } = useRequest();
  const cartCtx = useContext(CartContext);
  const mealsInCart = cartCtx.getMapMeals();
  const [mealsData, setMealsData] = useState([] as MealInCart[]);

  const getMeals = useCallback(async () => {
    const meals = (await sendRequest("getMeals")) as Meal[];
    console.log("meals", meals);

    setMealsData(
      meals.map((meal) => {
        const mealInCart = mealsInCart[meal.id];
        return { ...meal, amount: mealInCart?.amount ?? 0 };
      })
    );
  }, [sendRequest]);

  useEffect(() => {
    getMeals();
  }, [getMeals]);

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
      {isLoading && <span className={classes.loader}></span>}
    </Card>
  );
};
