import React, { Component } from "react";
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import LogoutButton from "./Pages/Logout";
import PropTypes from "prop-types";
import Register from "./Pages/Register";
import { connect } from "react-redux";
import TopNavbar from "./Components/Navbar";

class App extends Component {
    render() {
        return (
            <Router>
                { this.props.userLoginInfo ? <TopNavbar /> : <TopNavbar /> }
                <Switch>
                    <Route exact path="/">
                        {this.props.userLoginInfo ? (
                            <Home />
                        ) : (
                            <Redirect to="/login" />
                        )}
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
                    </Route>
                    <Route path="/register">
                        {this.props.userLoginInfo ? (
                            <Redirect to="/" />
                        ) : (
                            <Register
                                cookieWrapper={this.props.cookieWrapper}
                                apiWrapper={this.props.apiWrapper}
                            />
                        )}
                    </Route>
                    <Route path="/home">
                        {this.props.userLoginInfo ? (
                            <Home />
                        ) : (
                            <Redirect to="/login" />
                        )}
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

const mapStateToProps = state => ({
    userLoginInfo: state.userLoginInfo
});

export default connect(
    mapStateToProps,
    null
)(App);
