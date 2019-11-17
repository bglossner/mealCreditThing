import "../css/login.css";
import "../css/user_error.css";

import React, { Component } from "react";

import Checkbox from "../Components/Checkbox";
import Error from "../Components/Error";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Ribbon from "../Components/Ribbon";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorRibbons: null
        };
    }

    storeLoginInfo = apiResult => {
        delete apiResult["message"];
        this.props.cookieWrapper.storeCookie(
            "user_information",
            JSON.stringify(apiResult),
            5000
        );
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

    attemptLogin() {
        let formElements = document
            .querySelector("#info-form")
            .getElementsByTagName("input");
        let formEntries = {};
        for (let ele of formElements) {
            formEntries[ele.name] = ele.value;
        }
        let returnVal = this.props.apiWrapper.login(
            formEntries["username"],
            formEntries["password"]
        );

        returnVal
            .then(result => {
                if (result === false) {
                    console.log("Username/password empty");
                } else {
                    console.log(result);
                    if (this.props.store.getState().rememberMeChecked) {
                        console.log("Storing cookies");
                        this.storeLoginInfo(result);
                    }
                    this.props.store.dispatch({
                        type: "USER_ERROR",
                        userError: null
                    });
                    alert("Success");
                    this.setState();
                }
            })
            .catch(reason => {
                console.log(reason);
                this.handleLoginErrors(reason);
            });
    }

    render() {
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
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
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
                    <button
                        onClick={() => {
                            console.log(
                                this.props.cookieWrapper.retrieveCookieIfExists(
                                    "user_information"
                                )
                            );
                        }}
                    />
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
