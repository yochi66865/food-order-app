import { MealDetails } from "../../../shared/MealDetails/MealDetails";
import { MealInCart } from "../../../store/cart/cartContext";
import classes from "./CartItem.module.css";

export const CartItem = ({
  mealInCart,
  updateAmount,
}: {
  mealInCart: MealInCart;
  updateAmount: (mealInCart: MealInCart) => void;
}) => {
  const addAmount = () => {
    setAmount(mealInCart.amount + 1);
  };
  const lowerAmount = () => {
    setAmount(mealInCart.amount - 1);
  };
  const setAmount = (amount: number) => {
    updateAmount({ ...mealInCart, amount });
  };

  return (
    <div className={classes["cart-item"]}>
      <MealDetails
        meal={mealInCart.meal}
        amount={mealInCart.amount}
      ></MealDetails>
      <div className={classes.actions}>
        <button onClick={lowerAmount}>-</button>
        <button onClick={addAmount}>+</button>
      </div>
    </div>
  );
};
