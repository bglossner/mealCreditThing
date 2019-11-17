import "./css/index.css";

import {
    Link,
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import React, { Component } from "react";

import APIWrapper from "./API/api_wrapper";
import CookiesWrapper from "./API/cookies";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import LogoutButton from "./Pages/Logout";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import Register from "./Pages/Register";
import { createStore } from "redux";
import reducers from "./redux/reducers/index";

const store = createStore(reducers);
class App extends Component {
    render() {
        const apiWrapper = new APIWrapper();
        const cookieWrapper = new CookiesWrapper();
        const retrievedLoginInfo = cookieWrapper.retrieveCookieIfExists(
            "user_information"
        );
        if (retrievedLoginInfo !== null) {
            console.log("NON NULL");
            store.dispatch({
                type: "CHANGE_LOGIN_INFO",
                loginInfo: JSON.parse(retrievedLoginInfo)
            });
        }
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        {console.log("fsejkfe")}
                        <Route exact path="/">
                            {console.log("daw", store.getState().userLoginInfo)}
                            {store.getState().userLoginInfo ? (
                                <Home />
                            ) : (
                                <Redirect to="/login" />
                            )}
                            <LogoutButton
                                store={store}
                                cookieWrapper={cookieWrapper}
                            />
                        </Route>
                        <Route path="/login">
                            {store.getState().userLoginInfo ? (
                                <Redirect to="/" />
                            ) : (
                                <Login
                                    cookieWrapper={cookieWrapper}
                                    store={store}
                                    apiWrapper={apiWrapper}
                                />
                            )}
                            <LogoutButton
                                store={store}
                                cookieWrapper={cookieWrapper}
                            />
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
                        <Route path="/home">
                            {console.log(
                                "da321312321w",
                                store.getState().userLoginInfo
                            )}
                            {/* store.getState().userLoginInfo ? <Home /> : <Redirect to="/login" /> */}
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

App.propTypes = {};

export default App;
