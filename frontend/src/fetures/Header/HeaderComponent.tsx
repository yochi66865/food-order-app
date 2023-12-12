import { Fragment, useContext, useState } from "react";
import classes from "./Header.module.css";
import meals from "../../assets/meals.jpg";
import { HeaderCartButton } from "./HeaderCartButton/HeaderCartButton";
import { Modal } from "../../shared/Modal/Modal";
import { Cart } from "../cart/Cart";
import { HeaderLoginButton } from "./HeaderLoginButton/HeaderLoginButton";
import { Account } from "../user/account/Account";

export const Header = () => {
  const [isShowCartModal, toggleShowingCartModal] = useState(false);
  const [isShowUserModal, toggleShowingUserModal] = useState(false);

  const toggleCartModal = () => {
    toggleShowingCartModal((isShowing) => !isShowing);
  };

  const toggleUserModal = () => {
    toggleShowingUserModal((isShowing) => !isShowing);
  };

  const saveCartModal = () => {
    console.log("order");
    toggleCartModal();
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <h2>ReactMeals</h2>
        <HeaderCartButton onClick={toggleCartModal}></HeaderCartButton>
        <HeaderLoginButton
          onClick={toggleUserModal}
          toggleArrow={isShowUserModal}
        ></HeaderLoginButton>
        {isShowUserModal && (
          <Account
            className={classes.user}
            closeModal={toggleUserModal}
          ></Account>
        )}
      </div>
      <div className={classes["main-image"]}>
        <img src={meals} alt="meals" />
      </div>
      {isShowCartModal && (
        <Modal onClose={toggleCartModal}>
          <Cart onClose={toggleCartModal} onSave={saveCartModal}></Cart>
        </Modal>
      )}
    </Fragment>
  );
};
