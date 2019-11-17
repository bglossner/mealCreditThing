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
import { userLoginInfo, createNewError } from "../redux/actions/index"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirect: false,
            error: {},
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
        console.log("HERE")

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
                    <Ribbon />
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
                    <button onClick={() => {
                        console.log(this.props.cookieWrapper.retrieveCookieIfExists("user_information"));
                    }} />
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    pageError: PropTypes.object,
    apiWrapper: PropTypes.object,
    cookieWrapper: PropTypes.object,
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
