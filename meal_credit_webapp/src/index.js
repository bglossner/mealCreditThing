import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import GeneralFormContainer from './login';
import Home from './home';
import LogoutButton from './logout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers/index';
import APIWrapper from './api_wrapper';
import CookiesWrapper from './cookies';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

document.title = "Meal Credit App";

var apiWrapper = new APIWrapper();
var cookieWrapper = new CookiesWrapper();
var retrievedLoginInfo = cookieWrapper.retrieveCookieIfExists("user_information");
const store = createStore(reducers);

store.dispatch({
    type: 'CHANGE_LOGIN_INFO',
    loginInfo: retrievedLoginInfo === null ? null : JSON.parse(retrievedLoginInfo),
});

ReactDOM.render (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    { retrievedLoginInfo === null ? <Redirect to="/login" /> : <Home /> }
                </Route>
                <Route path="/login">
                    <LogoutButton store={store} cookieWrapper={cookieWrapper} />
                    <GeneralFormContainer cookieWrapper={cookieWrapper} store={store} api={apiWrapper} />
                </Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);