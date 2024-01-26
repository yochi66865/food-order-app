import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { CartContext, MealInCart } from "../../store/cart/cartContext";
import { CartItem } from "./CartItem/CartItem";
import { MealItem } from "../meals/MealItem/MealItem";

export const Cart = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) => {
  const CartCtx = useContext(CartContext);
  const meals = CartCtx.getMeals();
  const totalCart = CartCtx.getTotalCart();

  const updateAmount = (mealInCart: MealInCart) => {
    if (mealInCart.amount === 0) {
      CartCtx.deleteMeal(mealInCart.meal.id);
    } else {
      CartCtx.updateAmount(mealInCart.meal.id, mealInCart.amount);
    }
  };

  return (
    <Fragment>
      <ul className={classes["cart-items"]}>
        {meals.map((mealInCart) => (
          <CartItem
            mealInCart={mealInCart}
            updateAmount={updateAmount}
            key={mealInCart.meal.id}
          ></CartItem>
        ))}
      </ul>
      <div className={classes.total}>
        <label>Total amount</label>
        <label>${totalCart}</label>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          close
        </button>
        <button
          className={`${classes.button} ${
            totalCart === 0 ? classes.disabled : ""
          }`}
          onClick={onSave}
        >
          order
        </button>
      </div>
    </Fragment>
  );
};
