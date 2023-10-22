import { Meal } from "../../models/meal.model";

export type addMealAction = {
  type: "ADD_MEAL";
  value: { meal: Meal; amount: number };
};

export type deleteMealAction = {
  type: "DELETE_MEAL";
  value: { mealId: string };
};

export type updateAmountAction = {
  type: "UPDATE_AMOUNT";
  value: { mealId: string; amount: number };
};

export type cartAction = addMealAction | deleteMealAction | updateAmountAction;
