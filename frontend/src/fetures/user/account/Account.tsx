import { useContext, useState } from "react";
import classes from "./Account.module.css";
import { UserContext } from "../../../store/user/userContext";
import { Modal } from "../../../shared/Modal/Modal";
import { Login } from "../LoginForm/Login";
import { Register } from "../RegisterForm/Register";
import { Orders } from "../OrdersModal/Orders";

export const Account = (props: {
  className?: string;
  closeAccountModal: () => void;
}) => {
  const userCtx = useContext(UserContext);
  const isLoggedIn = !!userCtx.getCurrentUser()?.id;
  const [isShowModal, toggleShowingModal] = useState(false);
  const [modalContent, changeModalContent] = useState(<></>);
  const [isCloseModalByBackground, closeModalByBackground] = useState(false);

  const onClosePopup = () => {
    toggleShowingModal(false);
    props.closeAccountModal();
  };

  const openOrdersModal = () => {
    changeModalContent(<Orders></Orders>);
    closeModalByBackground(true);
    toggleShowingModal(true);
    // props.closeAccountModal();
  };

  const openSignInModal = () => {
    changeModalContent(<Login onClosePopup={onClosePopup}></Login>);
    toggleShowingModal(true);
  };

  const openSignUpModal = () => {
    changeModalContent(<Register onClosePopup={onClosePopup}></Register>);
    toggleShowingModal(true);
  };

  const signOutHandler = () => {
    userCtx.signOut();
    props.closeAccountModal();
  };

  const accountContent = isLoggedIn ? (
    <>
      <button className={classes.bold} onClick={openOrdersModal}>
        My Orders
      </button>
      <button onClick={signOutHandler}>sign out</button>
    </>
  ) : (
    <>
      <button className={classes.bold} onClick={openSignInModal}>
        sign in
      </button>
      <button onClick={openSignUpModal}>sign up</button>
    </>
  );

  return (
    <>
      <div className={`${classes.account} ${props.className ?? ""}`}>
        {accountContent}
      </div>
      {isShowModal && (
        <Modal onClose={isCloseModalByBackground ? onClosePopup : () => {}}>
          {modalContent}
        </Modal>
      )}
    </>
  );
};
