import "../css/login.css";
import "../css/user_error.css";

import * as Constants from "../Constants";

import React, { Component } from "react";

import Checkbox from "../Components/Checkbox";
import Error from "../Components/Error";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLoginInfo, createNewError } from "../redux/actions/index"

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
            console.log("STORING INFO");
            this.props.cookieWrapper.storeCookie(
                "user_information",
                JSON.stringify(apiResult),
                5000
            );
        }
        this.props.loginStore(apiResult);
    };

    handleLoginErrors(error) {
        this.setState({
            error: {
                status: error.status,
                errorMsg: error.message,
            }
        });
        this.props.newError(error.errorMsg);
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
                    this.props.newError(null);
                    this.storeLoginInfo(result, this.props.rememberMeChecked);
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
        console.log("RERE")
        console.log("Current login infp", this.props.rememberMeChecked, this.props.currentLoginInfo);
        return (
            <div className="login-page">
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
    apiWrapper: PropTypes.object,
    cookieWrapper: PropTypes.object
};

function mapStateToProps(state) {
    return {
        pageError: state.userError,
        rememberMeChecked: state.rememberMeChecked,
        currentLoginInfo: state.userLoginInfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching plain actions
        loginStore: (apiResult) => dispatch(userLoginInfo(apiResult)),
        newError: (errorMsg) => dispatch(createNewError(errorMsg)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
