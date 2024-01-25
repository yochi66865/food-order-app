import { useContext } from "react";
import { UserContext } from "../../../store/user/userContext";
import classes from "./Orders.module.css";
import { Order } from "models";
import { ArrowIcon } from "../../../shared/icons/ArrowIcon/ArrowIcon";
import { OrderDetails } from "./OrderDetails/OrderDetails";
export const Orders = () => {
  const userctx = useContext(UserContext);
  const orders: Order[] | null = userctx.getOrders();

  const context = !orders?.length ? (
    <p>there is no orders yet</p>
  ) : (
    orders!.map((order) => (
      <OrderDetails order={order} key={order.id}></OrderDetails>
    ))
  );
  return <div className={classes["order-panel"]}>{context}</div>;
};
