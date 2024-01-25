import { Meal } from "models";
import { mealsActions } from "./mealsActions";

export type mealsState = {
  meals: Meal[];
};

export const mealsReducer: (
  state: mealsState,
  action: mealsActions
) => mealsState = (state: mealsState, action: mealsActions) => {
  switch (action.type) {
    case "FETCH_MEALS": {
      return { meals: action.value.meals };
    }
  }
};
