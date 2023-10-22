import { useState } from "react";
import "./App.css";
import { Header } from "./fetures/layout/Header/HeaderComponent";
import { AvailableMeals } from "./fetures/meals/AvailableMeals";
import { MealsSummary } from "./fetures/meals/MealsSummary/MealsSummary";
import { Modal } from "./shared/Modal/Modal";

export const App = () => {
  const [isShowModal, toggleShowingModal] = useState(false);
  const toggleModal = () => {
    toggleShowingModal(!isShowModal);
  };
  return (
    <div className="App">
      <Header />
      <MealsSummary />
      <AvailableMeals />
      <button onClick={toggleModal}>open modal</button>
      {isShowModal && <Modal onClose={toggleModal}>jjj</Modal>}
    </div>
  );
};
