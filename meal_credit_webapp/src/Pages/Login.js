import * as Constants from "../Constants";

import React, { Component } from "react";

import { Button } from "react-bootstrap";
import Error from "../Components/Error";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SmartCheckbox from "../Components/Checkbox";
import { connect } from "react-redux";
import { userLoginInfo } from "../redux/actions/index";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldDirect: false,
            username: "",
            password: "",
            error: {},
            forceShowErrors: false
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
                message: error.message
            }
        });
    }

    attemptLogin() {
        if (!(this.validateUsername() && this.validatePassword())) {
            this.setState({
                forceShowErrors: true
            });
            return;
        }
        let returnVal = this.props.apiWrapper.login(
            this.state.username,
            this.state.password
        );

        returnVal
            .then(result => {
                console.log(result);
                this.storeLoginInfo(result, this.props.rememberMeChecked);
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
        // console.log("Current login infp", this.props.rememberMeChecked, this.props.currentLoginInfo);
        return (
            <div className="login-page">
                <div className="user-info-form">
                    {this.state.error.message && (
                        <Error message={this.state.error.message} />
                    )}
                    {/* <Ribbon /> */}
                    <div id="info-form" className="login-form">
                        <Input
                            name="username"
                            type="text"
                            placeholder="Username/Email"
                            onChange={evt => this.updateUsername(evt)}
                            forceShowErrors={this.state.forceShowErrors}
                            valid={this.validateUsername()}
                            errorMessage={`Username length should be at least ${Constants.MIN_USERNAME_LENGTH} and at most ${Constants.MAX_USERNAME_LENGTH}`}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={evt => this.updatePassword(evt)}
                            forceShowErrors={this.state.forceShowErrors}
                            valid={this.validatePassword()}
                            errorMessage={`Password length should be at least ${Constants.MIN_PASSWORD_LENGTH} and at most ${Constants.MAX_PASSWORD_LENGTH}`}
                        />

                        <SmartCheckbox
                            store={this.props.store}
                            message={"Remember Me"}
                        />
                        <Button
                            variant="success"
                            type="submit"
                            onClick={() => this.attemptLogin()}
                        >
                            login
                        </Button>
                        <p className="message">
                            Not registered?{" "}
                            <Link to="/register">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    pageError: PropTypes.string,
    apiWrapper: PropTypes.object,
    cookieWrapper: PropTypes.object
};

function mapStateToProps(state) {
    return {
        rememberMeChecked: state.rememberMeChecked,
        currentLoginInfo: state.userLoginInfo
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loginStore: apiResult => dispatch(userLoginInfo(apiResult))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
