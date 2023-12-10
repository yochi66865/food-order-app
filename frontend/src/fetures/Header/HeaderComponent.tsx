import { Fragment, useState } from "react";
import classes from "./Header.module.css";
import meals from "../../assets/meals.jpg";
import { HeaderCartButton } from "./HeaderCartButton/HeaderCartButton";
import { Modal } from "../../shared/Modal/Modal";
import { Cart } from "../cart/Cart";

export const Header = () => {
  const [isShowModal, toggleShowingModal] = useState(false);

  const openModal = () => {
    toggleShowingModal(true);
  };

  const closeModal = () => {
    toggleShowingModal(false);
  };

  const saveModal = () => {
    console.log("order");
    toggleShowingModal(false);
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <h2>ReactMeals</h2>
        <HeaderCartButton onClick={openModal}></HeaderCartButton>
      </div>
      <div className={classes["main-image"]}>
        <img src={meals} alt="meals" />
      </div>
      {isShowModal && (
        <Modal onClose={closeModal}>
          <Cart onClose={closeModal} onSave={saveModal}></Cart>
        </Modal>
      )}
    </Fragment>
  );
};
