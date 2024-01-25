import { Meal } from "models";

export type fetchMeals = {
  type: "FETCH_MEALS";
  value: { meals: Meal[] };
};

export type mealsActions = fetchMeals;
