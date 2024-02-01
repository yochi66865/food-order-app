import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { CartContext, MealInCart } from "../../store/cart/cartContext";
import { CartItem } from "./CartItem/CartItem";
import { MealItem } from "../meals/MealItem/MealItem";
import { UserContext } from "../../store/user/userContext";
import { Order, OrderInput, mealInOrder, statusOrder } from "models";

export const Cart = ({ onClose }: { onClose: () => void }) => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);
  const meals = cartCtx.getMeals();
  const totalCart = cartCtx.getTotalCart();
  const [isSendingNewOrder, sendingNewOrder] = useState(false);
  const [isSaveOrder, SaveOrder] = useState(false);

  const updateAmount = (mealInCart: MealInCart) => {
    if (mealInCart.amount === 0) {
      cartCtx.deleteMeal(mealInCart.meal.id);
    } else {
      cartCtx.updateAmount(mealInCart.meal.id, mealInCart.amount);
    }
  };

  const saveCartModal = async () => {
    sendingNewOrder(true);
    const user = userCtx.getCurrentUser();
    if (user) {
      const meals: mealInOrder[] = cartCtx.getMeals().map((mealInCart) => ({
        mealId: mealInCart.meal.id,
        amount: mealInCart.amount,
      }));

      const newOrder: OrderInput = {
        meals,
        orderDate: new Date(),
        status: statusOrder.processing,
        total: cartCtx.getTotalCart(),
        userId: user.id,
      };
      const isSavedOrder = await userCtx.setNewOrder(newOrder);
      if (isSavedOrder) {
        SaveOrder(true);
        cartCtx.clearCart();
      }
    } else {
      alert("you are not logged in yet. please login before order.");
    }
    sendingNewOrder(false);
  };

  const onCloseAfterSaved = () => {
    SaveOrder(false);
    onClose();
  };

  const cartContext = (
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
          onClick={saveCartModal}
        >
          order
        </button>
      </div>
    </Fragment>
  );

  const sendNewOrderContext = <p>sending...</p>;

  const successfullyOrdered = (
    <Fragment>
      <p>successfully save the order</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onCloseAfterSaved}>
          close
        </button>
      </div>
    </Fragment>
  );

  return (
    <>
      {!isSendingNewOrder && !isSaveOrder && cartContext}
      {isSendingNewOrder && sendNewOrderContext}
      {isSaveOrder && successfullyOrdered}
    </>
  );
};
