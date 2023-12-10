import {
  Context,
  Dispatch,
  createContext,
  useCallback,
  useReducer,
} from "react";
import { Meal } from "models";
import { cartAction } from "./cartActions";
import { CartState, cartReducer } from "./cartReducer";

export type MealInCart = Meal & { amount: number };

export type cartType = {
  getMapMeals: () => { [mealId: string]: MealInCart };
  getMeals: () => MealInCart[];
  getTotalCart: () => number;
  getCountOfCart: () => number;
  addMeal: (mealInCart: MealInCart) => void;
  deleteMeal: (mealId: string) => void;
  updateAmount: (mealId: string, amount: number) => void;
};

export const CartContext: Context<cartType> = createContext({
  getMapMeals: () => ({} as { [mealId: string]: MealInCart }),
  getMeals: () => [] as MealInCart[],
  getTotalCart: () => 0,
  getCountOfCart: () => 0,
  addMeal: (mealInCart: MealInCart) => {},
  deleteMeal: (mealId: string) => {},
  updateAmount: (mealId: string, amount: number) => {},
});

export const CartContextComponent = (props: { children: any }) => {
  const [cartState, dispatchCartAction]: [CartState, Dispatch<cartAction>] =
    useReducer(cartReducer, { meals: {} });

  const getMapMeals = useCallback(() => ({ ...cartState.meals }), [cartState]);

  const getMeals = () => Object.values(cartState.meals);

  const getTotalOfMeal = (meal: MealInCart) => meal.amount * meal.price;

  const getTotalCart = () => +sum(getMeals().map(getTotalOfMeal)).toFixed(2);

  const getCountOfCart = () => sum(getMeals().map((meal) => meal.amount));

  const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0);

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
      value={{
        getMapMeals,
        getMeals,
        getTotalCart,
        getCountOfCart,
        addMeal,
        deleteMeal,
        updateAmount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
