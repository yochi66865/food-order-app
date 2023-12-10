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
        <h3>{mealData.name}</h3>
        <div className={classes.description}>{mealData.description}</div>
        <div className={classes.price}>${mealData.price}</div>
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
