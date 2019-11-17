import "./css/index.css";

import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import React, { Component } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import LogoutButton from "./Pages/Logout";
import Register from "./Pages/Register";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {this.props.userLoginInfo ? (
                            <Home />
                        ) : (
                            <Redirect to="/login" />
                        )}
                        <LogoutButton
                            cookieWrapper={this.props.cookieWrapper}
                        />
                    </Route>
                    <Route path="/login">
                        {this.props.userLoginInfo ? (
                            <Redirect to="/" />
                        ) : (
                            <Login
                                cookieWrapper={this.props.cookieWrapper}
                                apiWrapper={this.props.apiWrapper}
                            />
                        )}
                        <LogoutButton
                            store={this.props.store}
                            cookieWrapper={this.props.cookieWrapper}
                        />
                        {/* <LogoutButton cookieWrapper={cookieWrapper} /> */}
                    </Route>
                    <Route path="/register">
                        {/* <LogoutButton cookieWrapper={cookieWrapper} /> */}
                        <Register
                            cookieWrapper={this.props.cookieWrapper}
                            apiWrapper={this.props.apiWrapper}
                        />
                    </Route>
                    <Route path="/home">
                        {this.props.userLoginInfo ? <Home /> : <Redirect to="/login" />}
                    </Route>
                </Switch>
            </Router>
        );
    }
}

App.propTypes = {
    cookieWrapper: PropTypes.object,
    apiWrapper: PropTypes.object
};

const mapStateToProps = (state) => ({
    userLoginInfo: state.userLoginInfo,
});

export default connect(
    mapStateToProps,
    null
)(App);
