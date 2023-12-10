import { MealInCart } from "../../../store/cart/cartContext";
import classes from "./CartItem.module.css";

export const CartItem = ({
  meal,
  updateAmount,
}: {
  meal: MealInCart;
  updateAmount: (meal: MealInCart) => void;
}) => {
  const addAmount = () => {
    setAmount(meal.amount + 1);
  };
  const lowerAmount = () => {
    setAmount(meal.amount - 1);
  };
  const setAmount = (amount: number) => {
    updateAmount({ ...meal, amount });
  };

  return (
    <div className={classes["cart-item"]}>
      <div className={classes.item}>
        <h2>{meal.name}</h2>
        <div className={classes.summary}>
          <label className={classes.price}>${meal.price}</label>
          <div className={classes.amount}>x {meal.amount}</div>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={lowerAmount}>-</button>
        <button onClick={addAmount}>+</button>
      </div>
    </div>
  );
};
