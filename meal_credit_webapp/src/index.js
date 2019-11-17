import "./css/index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import APIWrapper from "./API/api_wrapper";
import CookiesWrapper from "./API/cookies";
import { createStore } from "redux";
import reducers from "./redux/reducers/index";
import { Provider } from "react-redux";

const store = createStore(reducers);
const apiWrapper = new APIWrapper();
const cookieWrapper = new CookiesWrapper();
const retrievedLoginInfo = cookieWrapper.retrieveCookieIfExists(
    "user_information"
);
if (retrievedLoginInfo !== null) {
    store.dispatch({
        type: "CHANGE_LOGIN_INFO",
        loginInfo: JSON.parse(retrievedLoginInfo)
    });
}

ReactDOM.render(
    <Provider store={store}>
        <App cookieWrapper={cookieWrapper} apiWrapper={apiWrapper} />
    </Provider>, 
    document.getElementById("root")
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
