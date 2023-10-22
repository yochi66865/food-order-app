import { Fragment } from "react";
import classes from "./Header.module.css";
import meals from "../../../assets/meals.jpg";
import { HeaderCartButton } from "./HeaderCartButton/HeaderCartButton";

export const Header = () => {
  const countInCart = 0;
  return (
    <Fragment>
      <div className={classes.header}>
        <h2>ReactMeals</h2>
        <HeaderCartButton countInCart={countInCart}></HeaderCartButton>
      </div>
      <div className={classes["main-image"]}>
        <img src={meals} alt="meals" />
      </div>
    </Fragment>
  );
};
