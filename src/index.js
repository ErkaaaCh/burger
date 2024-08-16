import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Pages/App/index";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import burgerReducer from "./redux/reducer/burger_Reducer";
import orderReducer from "./redux/reducer/orderReducer";
import { signupUser } from "./redux/actions/signupActions";
import signupReducer from "./redux/reducer/signupreducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const MyloggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log("MyMiddleware: Dispatcing: ===>", action);
      console.log("MyMiddleware: Before State: ===>", store.getState());
      const result = next(action);
      console.log("MyMiddleware: After State: ===>", store.getState());
      return result;
    };
  };
};

const reducers = combineReducers({
  burgerReducer,
  orderReducer,
  signupReducer,
});
const middleWares = [MyloggerMiddleware, thunk];
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleWares))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
