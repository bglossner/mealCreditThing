import "./css/index.css";

import {
    Link,
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import APIWrapper from "./API/api_wrapper";
import CookiesWrapper from "./API/cookies";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import LogoutButton from "./Pages/Logout"
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import Register from "./Pages/Register";
import { createStore } from "redux";
import reducers from "./redux/reducers/index";

document.title = "Meal Credit App";

var apiWrapper = new APIWrapper();
var cookieWrapper = new CookiesWrapper();
var retrievedLoginInfo = cookieWrapper.retrieveCookieIfExists(
    "user_information"
);
const store = createStore(reducers);
console.log(JSON.parse(retrievedLoginInfo))

if (retrievedLoginInfo !== null) {
    console.log("NON NULL")
    store.dispatch({
        type: "CHANGE_LOGIN_INFO",
        loginInfo: JSON.parse(retrievedLoginInfo),
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    {retrievedLoginInfo ? <Home /> : <Redirect to="/login" /> }
                    <LogoutButton store={store} cookieWrapper={cookieWrapper} />
                </Route>
                <Route path="/login">
                    {
                        store.getState().userLoginInfo ? 
                        <Redirect to="/" /> : 
                        <Login
                            cookieWrapper={cookieWrapper}
                            store={store}
                            apiWrapper={apiWrapper}
                        />
                    }
                    <LogoutButton store={store} cookieWrapper={cookieWrapper} />
                    {/* <LogoutButton store={store} cookieWrapper={cookieWrapper} /> */}
                </Route>
                <Route path="/register">
                    {/* <LogoutButton store={store} cookieWrapper={cookieWrapper} /> */}
                    <Register
                        cookieWrapper={cookieWrapper}
                        store={store}
                        apiWrapper={apiWrapper}
                    />
                </Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
