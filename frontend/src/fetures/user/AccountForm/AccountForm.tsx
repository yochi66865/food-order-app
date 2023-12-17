import { EventHandler, FormEvent, SyntheticEvent, useRef } from "react";
import classes from "./AccountForm.module.css";

export const AccountForm = ({
  onClose,
  onSave,
  children,
  isValidForm,
}: {
  onClose: () => void;
  onSave: () => void;
  children: any;
  isValidForm: boolean;
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
          disabled={!isValidForm}
          className={classes.button}
          onClick={onSave}
          type="submit"
        >
          save
        </button>
      </div>
    </form>
  );
};
