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
  getMealsMap: () => { [id: string]: Meal };
  isLoading: boolean;
};

export const MealsContext: Context<MealsType> = createContext({
  fetchMeals: () => {},
  getMeals: () => [] as Meal[],
  getMealsMap: () => ({} as { [id: string]: Meal }),
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

  const getMealsMap = useCallback(() => {
    const mealsMap = getMeals().reduce(
      (map: { [id: string]: Meal }, meal: Meal) => {
        map[meal.id] = meal;
        return map;
      },
      {}
    );
    return mealsMap;
  }, [getMeals]);

  return (
    <MealsContext.Provider
      value={{
        fetchMeals,
        getMeals,
        getMealsMap,
        isLoading,
      }}
    >
      {props.children}
    </MealsContext.Provider>
  );
};
