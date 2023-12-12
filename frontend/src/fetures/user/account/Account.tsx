import { useContext } from "react";
import classes from "./Account.module.css";
import { UserContext } from "../../../store/user/userContext";

export const Account = (props: {
  className?: string;
  closeModal: () => void;
}) => {
  const userCtx = useContext(UserContext);
  const isLoggedIn = !!userCtx.getCurrentUser()?.id;
  const content = isLoggedIn ? (
    <>
      <button className={classes.bold} onClick={props.closeModal}>
        My Orders
      </button>
      <button onClick={props.closeModal}>sign out</button>
    </>
  ) : (
    <>
      <button className={classes.bold} onClick={props.closeModal}>
        sign in
      </button>
      <button onClick={props.closeModal}>sign up</button>
    </>
  );
  return (
    <div className={`${classes.account} ${props.className ?? ""}`}>
      {content}
    </div>
  );
};
