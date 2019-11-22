import * as Constants from "../Constants";

import { Grid, withStyles } from "@material-ui/core";
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
class Register extends GeneralStart {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            email: null,
            phoneNumber: null,
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

    attemptRegistration() {
        if (
            !(
                this.validateUsername().valid &&
                this.validatePassword().valid &&
                this.validateName(this.state.firstName).valid &&
                this.validateName(this.state.lastName).valid
            )
        ) {
            this.setState({
                forceShowErrors: true
            });
            return;
        }
        const returnVal = this.props.apiWrapper.register(
            this.state.firstName,
            this.state.lastName,
            this.state.username,
            this.state.password,
            this.state.email,
            this.state.phoneNumber
        );

        returnVal
            .then(result => {
                this.storeLoginInfo(result, this.props.rememberMeChecked);
            })
            .catch(reason => {
                this.handleLoginErrors(reason);
            });
    }

    updateFirstname(evt) {
        this.setState({
            firstName: evt.target.value
        });
    }

    updateLastname(evt) {
        this.setState({
            lastName: evt.target.value
        });
    }

    validateName(name, label = "None") {
        if (
            !(
                name.length <= Constants.MAX_NAME_LENGTH &&
                name.length >= Constants.MIN_NAME_LENGTH
            )
        ) {
            return {
                valid: false,
                errorMessage: `${label} length should be at least ${Constants.MIN_USERNAME_LENGTH} and at most ${Constants.MAX_USERNAME_LENGTH}`
            };
        }
        return {
            valid: true,
            errorMessage: ""
        };
    }

    updateUsername(evt) {
        this.setState({
            username: evt.target.value
        });
    }

    validateUsername() {
        if (
            !(
                this.state.username.length <= Constants.MAX_USERNAME_LENGTH &&
                this.state.username.length >= Constants.MIN_USERNAME_LENGTH
            )
        ) {
            return {
                valid: false,
                errorMessage: `Username length should be at least ${Constants.MIN_USERNAME_LENGTH} and at most ${Constants.MAX_USERNAME_LENGTH}`
            };
        }
        if (this.state.username.indexOf(" ") >= 0) {
            return {
                valid: false,
                errorMessage: `Username may not contain any spaces`
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
        if (
            !(
                this.state.password.length <= Constants.MAX_PASSWORD_LENGTH &&
                this.state.password.length >= Constants.MIN_PASSWORD_LENGTH
            )
        ) {
            return {
                valid: false,
                errorMessage: `Password length should be at least ${Constants.MIN_PASSWORD_LENGTH} and at most ${Constants.MAX_PASSWORD_LENGTH}`
            };
        }
        if (this.state.password.indexOf(" ") >= 0) {
            return {
                valid: false,
                errorMessage: `Password may not contain any spaces`
            };
        }
        return {
            valid: true,
            errorMessage: ""
        };
    }

    updateEmail(evt) {
        this.setState({
            email: evt.target.value
        });
    }

    validateEmail() {
        if (
            this.state.email &&
            this.props.apiWrapper.checkIfEmail(this.state.email) === false
        ) {
            return {
                errorMessage: "Please enter a valid email address",
                valid: false
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
    getHeadingText() {
        return "Register";
    }

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
                    name="First Name"
                    type="text"
                    onChange={evt => this.updateFirstname(evt)}
                    forceShowErrors={this.state.forceShowErrors}
                    checkInput={this.validateName(
                        this.state.firstName,
                        "First Name"
                    )}
                />
                <Input
                    name="Last Name"
                    type="text"
                    onChange={evt => this.updateLastname(evt)}
                    forceShowErrors={this.state.forceShowErrors}
                    checkInput={this.validateName(
                        this.state.lastName,
                        "Last Name"
                    )}
                />
                <Input
                    name="Username"
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
                <Input
                    name="Email"
                    type="email"
                    required={false}
                    onChange={evt => this.updateEmail(evt)}
                    checkInput={this.validateEmail()}
                />
                <Input name="Phone Number" type="text" required={false} />
            </Grid>
        );
    }

    /**
     * Should be implemented by subclass
     */
    onSubmit() {
        this.attemptRegistration();
    }

    getSubmitButtonText() {
        return "Create An Account";
    }

    /**
     * Should be implemented by subclass
     */
    renderTransitionText() {
        return (
            <span>
                Already have an account? <Link to="/login">Sign In</Link>
            </span>
        );
    }
}

Register.propTypes = {
    pageError: PropTypes.object,
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
)(withStyles(styles)(Register));
