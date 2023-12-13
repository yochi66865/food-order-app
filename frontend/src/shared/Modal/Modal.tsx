import { Fragment } from "react";
import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props: { onClick: () => void }) => (
  <div className={classes.backdrop} onClick={props.onClick}></div>
);
const Overlay = (props: { children: any }) => (
  <div className={classes.modal}>{props.children}</div>
);

const emptyMethod = () => {};
export const Modal = (props: { children: any; onClose?: () => void }) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onClick={props.onClose ?? emptyMethod} />,
        document.getElementById("backdrop-root")!
      )}
      {createPortal(
        <Overlay children={props.children} />,
        document.getElementById("overlay-root")!
      )}
    </Fragment>
  );
};
