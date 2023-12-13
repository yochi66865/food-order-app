import { EventHandler, FormEvent, SyntheticEvent, useRef } from "react";
import classes from "./AccountForm.module.css";

export const AccountForm = ({
  onClose,
  onSave,
  children,
}: {
  onClose: () => void;
  onSave: () => void;
  children: any;
}) => {
  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <form className={classes["account-form"]} onSubmit={submitHandler}>
      {children}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          cancel
        </button>
        <button
          className={`${classes.button} ${false ? classes.disabled : ""}`}
          onClick={onSave}
          type="submit"
        >
          save
        </button>
      </div>
    </form>
  );
};
