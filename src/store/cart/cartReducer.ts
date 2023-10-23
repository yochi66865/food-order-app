import { Meal } from "../../models/meal.model";
import { cartAction } from "./cartActions";
import { MealInCart } from "./cartContext";

export type CartState = {
  meals: { [mealId: string]: MealInCart };
};

export const cartReducer: (
  state: CartState,
  action: cartAction
) => CartState = (state: CartState, action: cartAction) => {
  switch (action.type) {
    case "ADD_MEAL": {
      const { mealInCart } = action.value;
      return {
        meals: { ...state.meals, ...{ [mealInCart.id]: { ...mealInCart } } },
      };
    }
    case "DELETE_MEAL": {
      const { mealId } = action.value;
      const meals = { ...state.meals };
      delete meals[mealId];
      return { meals };
    }
    case "UPDATE_AMOUNT": {
      const { mealId, amount } = action.value;
      const meals = { ...state.meals };
      return { meals: { ...meals, [mealId]: { ...meals[mealId], amount } } };
    }
  }
};
