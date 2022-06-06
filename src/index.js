import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //Provider keeps track of the store which is at a global state and that allows us to access that store from anywhere inside the App
import { createStore, applyMiddleware, compose } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";

import reducers from "./reducers";

import App from "./App";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
