import { useContext, useEffect, useState } from "react";
import { CartIcon } from "../../../shared/CartIcon/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { CartContext } from "../../../store/cart/cartContext";

export const HeaderCartButton = (props: { onClick: () => void }) => {
  const cartCtx = useContext(CartContext);
  const countOfCart = cartCtx.getCountOfCart();
  const [bumpClass, setBumpClass] = useState("");

  useEffect(() => {
    if (countOfCart !== 0) {
      setBumpClass(classes.bump);
    }
    setTimeout(() => {
      setBumpClass("");
    }, 300);
  }, [countOfCart]);

  return (
    <button
      onClick={props.onClick}
      className={`${classes.button} ${bumpClass}`}
    >
      <div className={classes.icon}>
        <CartIcon />
      </div>
      <label>Your cart</label>
      <div className={classes.badge}>{countOfCart}</div>
    </button>
  );
};
