import classes from "./OrderDetails.module.css";
import { Order } from "models";
import { ArrowIcon } from "../../../../shared/icons/ArrowIcon/ArrowIcon";
import { useState } from "react";
import { CopyIcon } from "../../../../shared/icons/CopyIcon/CartIcon";
import copy from "copy-to-clipboard";
import { MealsDetails } from "./mealsDetails/mealsDetails";

export const OrderDetails = ({ order }: { order: Order }) => {
  const [isOpenArrow, toggleArrow] = useState(false);

  const arrowClass = `${classes["arrow-icon"]} ${
    isOpenArrow ? classes.open : ""
  }`;

  const clickArrowHandler = () => {
    toggleArrow((prev) => !prev);
  };

  const copyOrderId = () => {
    copy(order.id);
    alert(`You have copied "${order.id}"`);
  };

  return (
    <div className={classes["order-item"]}>
      <div className={classes.header}>
        <h3 className={classes.status}>{order.status}</h3>
        <div className={classes.details}>
          <span>order date : {order.orderDate.toLocaleDateString()}</span>
          <div className={classes["order-id"]}>
            <span>order id : {order.id}</span>
            <CopyIcon onClickHandler={copyOrderId} />
          </div>
        </div>
        <button className={classes.button} onClick={clickArrowHandler}>
          order details <ArrowIcon className={arrowClass} />
        </button>
      </div>
      <div className={`${classes.meals} ${!isOpenArrow ? classes.close : ""}`}>
        <MealsDetails meals={order.meals}></MealsDetails>
      </div>
    </div>
  );
};
