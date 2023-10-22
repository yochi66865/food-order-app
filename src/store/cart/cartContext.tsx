import { Context, Dispatch, createContext, useReducer } from "react";
import { Meal } from "../../models/meal.model";
import { cartAction } from "./cartActions";
import { CartState, cartReducer } from "./cartReducer";

export type MealInCart = Meal & { amount: number };

export type cartType = {
  getMeals: () => MealInCart[];
  addMeal: (meal: Meal, amount: number) => void;
  deleteMeal: (mealId: string) => void;
  updateAmount: (mealId: string, amount: number) => void;
};

export const CartContext: Context<cartType> = createContext({
  getMeals: () => [] as MealInCart[],
  addMeal: (meal: Meal, amount: number) => {},
  deleteMeal: (mealId: string) => {},
  updateAmount: (mealId: string, amount: number) => {},
});

export const CartContextComponent = (props: { children: any }) => {
  const [cartState, dispatchCartAction]: [CartState, Dispatch<cartAction>] =
    useReducer(cartReducer, { meals: {} });

  const getMeals = () => Object.values(cartState.meals);

  const addMeal = (meal: Meal, amount: number) => {
    dispatchCartAction({ type: "ADD_MEAL", value: { meal, amount } });
  };

  const deleteMeal = (mealId: string) => {
    dispatchCartAction({ type: "DELETE_MEAL", value: { mealId } });
  };

  const updateAmount = (mealId: string, amount: number) => {
    dispatchCartAction({
      type: "UPDATE_AMOUNT",
      value: { mealId, amount },
    });
  };
  return (
    <CartContext.Provider
      value={{ getMeals, addMeal, deleteMeal, updateAmount }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
