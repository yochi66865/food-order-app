import { MealInCart } from "../../../store/cart/cartContext";
import { MealItemForm } from "../MealItemForm/MealItemForm";
import classes from "./MealItem.module.css";

export const MealItem = ({
  mealData,
  addToCart,
}: {
  mealData: MealInCart;
  addToCart: (mealData: MealInCart) => void;
}) => {
  const addMealToCart = (amount: number) => {
    addToCart({ ...mealData, amount });
  };

  return (
    <div className={classes.meal}>
      <div className={classes["meal-item"]}>
        <h3>{mealData.meal.name}</h3>
        <div className={classes.description}>{mealData.meal.description}</div>
        <div className={classes.price}>${mealData.meal.price}</div>
      </div>
      <div className={classes["meal-item-form"]}>
        <MealItemForm
          amount={mealData.amount}
          addToCart={addMealToCart}
        ></MealItemForm>
      </div>
    </div>
  );
};
