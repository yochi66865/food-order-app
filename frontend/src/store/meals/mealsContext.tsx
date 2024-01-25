import { Meal } from "models";
import {
  Context,
  Dispatch,
  createContext,
  useCallback,
  useReducer,
} from "react";
import { useRequest } from "../../hooks/useRequest";
import { mealsActions } from "./mealsActions";
import { mealsReducer, mealsState } from "./mealsReducer";

export type MealsType = {
  fetchMeals: () => void;
  getMeals: () => Meal[];
  isLoading: boolean;
};

export const MealsContext: Context<MealsType> = createContext({
  fetchMeals: () => {},
  getMeals: () => [] as Meal[],
  isLoading: false as boolean,
});

export const MealsContextComponent = (props: { children: any }) => {
  const { isLoading, hasError, sendRequest } = useRequest();
  const [mealsState, dispatchMealsAction]: [
    mealsState,
    Dispatch<mealsActions>
  ] = useReducer(mealsReducer, {
    meals: [],
  });

  const fetchMeals = useCallback(() => {
    sendRequest("getMeals", {
      method: "GET",
    })
      .then((response) => {
        let meals = response as Meal[];
        if (meals?.length && !hasError) {
          dispatchMealsAction({
            type: "FETCH_MEALS",
            value: { meals },
          });
        } else {
          throw new Error("error accourd when trying fetch meals from db");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [hasError, sendRequest]);

  const getMeals = useCallback(() => {
    return mealsState.meals ?? [];
  }, [mealsState]);

  return (
    <MealsContext.Provider
      value={{
        fetchMeals,
        getMeals,
        isLoading,
      }}
    >
      {props.children}
    </MealsContext.Provider>
  );
};
