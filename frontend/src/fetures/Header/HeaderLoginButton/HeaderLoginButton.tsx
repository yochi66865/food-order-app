import { useContext, useEffect, useState } from "react";
import { CartIcon } from "../../../shared/icons/CartIcon/CartIcon";
import classes from "./HeaderLoginButton.module.css";
import { CartContext } from "../../../store/cart/cartContext";
import { UserContext } from "../../../store/user/userContext";
import { AccountIcon } from "../../../shared/icons/AccountIcon/AccountIcon";
import { ArrowIcon } from "../../../shared/icons/ArrowIcon/ArrowIcon";

export const HeaderLoginButton = (props: {
  onClick: () => void;
  toggleArrow: boolean;
}) => {
  const userCtx = useContext(UserContext);
  const currentUser = userCtx.getCurrentUser();

  const content = currentUser?.id ? (
    <>
      <label>Hi, {currentUser.fname}</label>
      <label className={classes.bold}>Account</label>
    </>
  ) : (
    <>
      <label>Welcome</label>
      <label className={classes.bold}>Sign in / Register</label>
    </>
  );

  const arrowClass = `${classes["arrow-icon"]} ${
    props.toggleArrow ? classes.open : ""
  }`;

  return (
    <button onClick={props.onClick} className={classes.button}>
      <div className={classes.icon}>
        <AccountIcon />
      </div>
      <div className={classes.content}>{content}</div>
      <ArrowIcon className={arrowClass} />
    </button>
  );
};
