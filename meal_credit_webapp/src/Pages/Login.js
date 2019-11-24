import { Box, Grid, withStyles } from "@material-ui/core";
import { changeRememberMeValue, userLoginInfo } from "../redux/actions/actions";

import GeneralStart from "./GeneralStart";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const styles = theme => ({
    root: {
        height: "100vh",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
        // background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`
    },
    button: {
        margin: theme.spacing(1),
        alignSelf: "stretch",
        padding: theme.spacing(1),
        fontSize: theme.spacing(2),
        color: theme.palette.text.secondary
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        width: "45%",
        maxWidth: "450px",
        minWidth: "300px"
    }
});

class Login extends GeneralStart {
    constructor(props) {
        super(props);
        this.state = {
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

    attemptLogin() {
        if (!(this.validateUsername().valid && this.validatePassword().valid)) {
            this.setState({
                forceShowErrors: true
            });
            return;
        }
        const returnVal = this.props.apiWrapper.login(
            this.state.username,
            this.state.password
        );

        returnVal
            .then(result => {
                this.storeLoginInfo(result, this.props.rememberMeChecked);
            })
            .catch(reason => {
                this.handleLoginErrors(reason);
            });
    }

    updateUsername(evt) {
        this.setState({
            username: evt.target.value
        });
    }

    validateUsername() {
        if (this.state.username.length === 0) {
            return {
                valid: false,
                errorMessage: `Username or email is required`
            };
        }
        return {
            valid: true,
            errorMessage: ""
        };
    }

    updatePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    validatePassword() {
        if (this.state.password.length === 0) {
            return {
                valid: false,
                errorMessage: `Password is required`
            };
        }
        return {
            valid: true,
            errorMessage: ""
        };
    }

    /**
     * Render Functions
     */
    /* getHeadingText() {
        return "Sign In";
    } */

    /**
     * Should be implemented by subclass
     */

    renderFormFields() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                <Input
                    name="Username or Email"
                    type="text"
                    onChange={evt => this.updateUsername(evt)}
                    forceShowErrors={this.state.forceShowErrors}
                    checkInput={this.validateUsername()}
                />
                <Input
                    name="Password"
                    type="password"
                    onChange={evt => this.updatePassword(evt)}
                    forceShowErrors={this.state.forceShowErrors}
                    checkInput={this.validatePassword()}
                />
                <Box textAlign="right" m={1}>
                    <Link to="/register">Forgot Password?</Link>
                </Box>
            </Grid>
        );
    }

    /**
     * Should be implemented by subclass
     */
    onSubmit() {
        this.attemptLogin();
    }

    getSubmitButtonText() {
        return "Login";
    }

    /**
     * Should be implemented by subclass
     */
    renderTransitionText() {
        return (
            <span>
                Not registered? <Link to="/register">Create an account</Link>
            </span>
        );
    }
}

Login.propTypes = {
    apiWrapper: PropTypes.object,
    cookieWrapper: PropTypes.object
};

function mapStateToProps(state) {
    return {
        rememberMeChecked: state.rememberMeChecked
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loginStore: apiResult => dispatch(userLoginInfo(apiResult)),
        changeRememberMeValue: newValue =>
            dispatch(changeRememberMeValue(newValue))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Login));
