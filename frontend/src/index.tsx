import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartContextComponent } from "./store/cart/cartContext";
import { UserContextComponent } from "./store/user/userContext";
import { MealsContextComponent } from "./store/meals/mealsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <MealsContextComponent>
      <UserContextComponent>
        <CartContextComponent>
          <App />
        </CartContextComponent>
      </UserContextComponent>
    </MealsContextComponent>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
