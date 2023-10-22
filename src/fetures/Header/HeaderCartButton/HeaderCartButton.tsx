import { CartIcon } from "../../../shared/CartIcon/CartIcon";
import classes from "./HeaderCartButton.module.css";

export const HeaderCartButton = (props: {
  countInCart: number;
  onClick: () => void;
}) => {
  return (
    <button onClick={props.onClick} className={classes.button}>
      <div className={classes.icon}>
        <CartIcon />
      </div>{" "}
      <label>Your cart</label>
      <div className={classes.badge}>
        <div className={classes.bump}>{props.countInCart}</div>
      </div>
    </button>
  );
};
