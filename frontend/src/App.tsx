import { useContext, useEffect } from "react";
import "./App.css";
import { Header } from "./fetures/Header/HeaderComponent";
import { AvailableMeals } from "./fetures/meals/AvailableMeals";
import { MealsSummary } from "./fetures/meals/MealsSummary/MealsSummary";
import { MealsContext } from "./store/meals/mealsContext";

export const App = () => {
  const mealsCtx = useContext(MealsContext);
  const fetchMeals = mealsCtx.fetchMeals;

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  //
  return (
    <div className="App">
      <Header />
      <MealsSummary />
      <AvailableMeals />
    </div>
  );
};
