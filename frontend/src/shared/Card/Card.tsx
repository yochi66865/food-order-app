import classes from "./Card.module.css";

export const Card = (props: { children: any; className: string }) => (
  <div className={`${classes.card} ${props.className}`}> {props.children}</div>
);
