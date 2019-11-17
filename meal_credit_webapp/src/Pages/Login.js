import "../css/login.css";
import "../css/user_error.css";

import * as Constants from "../Constants";

import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";

import Checkbox from "../Components/Checkbox";
import Error from "../Components/Error";
import { FormControl } from "react-bootstrap";
import Input from "../Components/Input";
import PropTypes from "prop-types";
import Ribbon from "../Components/Ribbon";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldDirect: false,
            username: "",
            password: ""
        };
    }

    storeLoginInfo = (apiResult, shouldStoreCookie) => {
        delete apiResult["message"];
        if (shouldStoreCookie) {
            this.props.cookieWrapper.storeCookie(
                "user_information",
                JSON.stringify(apiResult),
                5000
            );
        }
        this.props.store.dispatch({
            type: "CHANGE_LOGIN_INFO",
            loginInfo: apiResult
        });
    };

    handleLoginErrors(error) {
        let jsonError = {};
        jsonError.status = error.status;
        jsonError.errorMsg = error.message;
        this.props.store.dispatch({
            type: "USER_ERROR",
            userError: jsonError
        });
    }

    considerRedirect() {
        if (this.state.shouldDirect) {
            console.log("HERE3");
            return <Redirect to="/home" />;
        }
        return null;
    }

    attemptLogin() {
        let returnVal = this.props.apiWrapper.login(
            this.state.username,
            this.state.password
        );
        console.log("HERE");

        returnVal
            .then(result => {
                if (result === false) {
                    console.log("Username/password empty");
                } else {
                    console.log(result);
                    this.storeLoginInfo(
                        result,
                        this.props.store.getState().rememberMeChecked
                    );
                    this.props.store.dispatch({
                        type: "USER_ERROR",
                        userError: null
                    });
                    alert("Success");
                    console.log("HERE2");
                    this.setState({ shouldDirect: true });
                }
            })
            .catch(reason => {
                console.log(reason);
                this.handleLoginErrors(reason);
            });
    }

    updateUsername(evt) {
        this.setState({
            username: evt.target.value
        });
    }

    validateUsername() {
        if (
            this.state.username.length <= Constants.MAX_USERNAME_LENGTH &&
            this.state.username.length >= Constants.MIN_USERNAME_LENGTH
        ) {
            return true;
        }
        return false;
    }

    updatePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    validatePassword() {
        if (
            this.state.password.length <= Constants.MAX_PASSWORD_LENGTH &&
            this.state.password.length >= Constants.MIN_PASSWORD_LENGTH
        ) {
            return true;
        }
        return false;
    }

    render() {
        console.log("RERE");
        console.log("HEllo", this.props.store.getState().userLoginInfo);
        return (
            <div className="login-page">
                {this.considerRedirect()}
                <div className="user-info-form">
                    {this.props.pageError === null ||
                    this.props.pageError === undefined ? null : (
                        <Error message={this.props.pageError.errorMsg} />
                    )}
                    {/* <Ribbon /> */}
                    <div id="info-form" className="login-form">
                        <React.Fragment>
                            <Input
                                name="username"
                                type="text"
                                placeholder="Username/Email"
                                onChange={evt => this.updateUsername(evt)}
                                valid={this.validateUsername()}
                                errorMessage={`Username length should be at least ${Constants.MIN_USERNAME_LENGTH} and at most ${Constants.MAX_USERNAME_LENGTH}`}
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={evt => this.updatePassword(evt)}
                                valid={this.validatePassword()}
                                errorMessage={`Password length should be at least ${Constants.MIN_PASSWORD_LENGTH} and at most ${Constants.MAX_PASSWORD_LENGTH}`}
                            />
                            <button onClick={() => this.attemptLogin()}>
                                login
                            </button>
                            {/* eslint-disable-next-line */}
                            <p className="message">
                                Not registered?{" "}
                                <Link to="/register">Create an account</Link>
                            </p>
                        </React.Fragment>
                    </div>
                    <Checkbox
                        store={this.props.store}
                        message={"Remember Me"}
                    />
                    {/* <button
                        onClick={() => {
                            console.log(
                                this.props.cookieWrapper.retrieveCookieIfExists(
                                    "user_information"
                                )
                            );
                        }}
                    /> */}
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    pageError: PropTypes.object,
    store: PropTypes.object,
    apiWrapper: PropTypes.object,
    cookieWrapper: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        pageError: state.userError
    };
}

export default connect(
    mapStateToProps,
    null
)(Login);
