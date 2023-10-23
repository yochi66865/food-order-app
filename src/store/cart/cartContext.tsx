import { Context, Dispatch, createContext, useReducer } from "react";
import { Meal } from "../../models/meal.model";
import { cartAction } from "./cartActions";
import { CartState, cartReducer } from "./cartReducer";

export type MealInCart = Meal & { amount: number };

export type cartType = {
  getMapMeals: () => { [mealId: string]: MealInCart };
  getMeals: () => MealInCart[];
  addMeal: (mealInCart: MealInCart) => void;
  deleteMeal: (mealId: string) => void;
  updateAmount: (mealId: string, amount: number) => void;
};

export const CartContext: Context<cartType> = createContext({
  getMapMeals: () => ({} as { [mealId: string]: MealInCart }),
  getMeals: () => [] as MealInCart[],
  addMeal: (mealInCart: MealInCart) => {},
  deleteMeal: (mealId: string) => {},
  updateAmount: (mealId: string, amount: number) => {},
});

export const CartContextComponent = (props: { children: any }) => {
  const [cartState, dispatchCartAction]: [CartState, Dispatch<cartAction>] =
    useReducer(cartReducer, { meals: {} });

  // const getMapMeals = () => ({ ...cartState.meals });
  const getMapMeals = () => {
    console.log("dddddddddddddddd");

    return { ...cartState.meals };
  };

  const getMeals = () => Object.values(cartState.meals);

  const addMeal = (mealInCart: MealInCart) => {
    dispatchCartAction({ type: "ADD_MEAL", value: { mealInCart } });
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
      value={{ getMapMeals, getMeals, addMeal, deleteMeal, updateAmount }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
