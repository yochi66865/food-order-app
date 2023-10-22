import "./App.css";
import { Header } from "./fetures/Header/HeaderComponent";
import { AvailableMeals } from "./fetures/meals/AvailableMeals";
import { MealsSummary } from "./fetures/meals/MealsSummary/MealsSummary";

export const App = () => {
  return (
    <div className="App">
      <Header />
      <MealsSummary />
      <AvailableMeals />
    </div>
  );
};
