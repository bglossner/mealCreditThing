import * as Constants from "../Constants";

import React, { Component } from "react";

import Input from "../Components/Input";
import { Link } from "react-router-dom";
import SmartCheckbox from "../Components/Checkbox";
import { changeRememberMeValue } from "../redux/actions/actions";
import { Grid, Paper, Button, Box, Typography } from "@material-ui/core";
import { Alert } from "react-bootstrap";

const styles = theme => ({
    root: {
        height: "80vh",
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
        fontSize: theme.spacing(2)
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

export default class GeneralStart extends Component {
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

    /**
     * Render Functions
     */
    renderHeading() {
        return (
            <Box textAlign="center" display="block" p={1} m={1}>
                <Typography variant="h2" color="textSecondary">
                    Sign In
                </Typography>
            </Box>
        );
    }

    renderErrorMessage() {
        return (
            this.state.error.message && (
                <Alert variant="danger">{this.state.error.message}</Alert>
            )
        );
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
                    name="Username"
                    type="text"
                    onChange={evt => this.updateUsername(evt)}
                    forceShowErrors={this.state.forceShowErrors}
                    valid={this.validateUsername()}
                    errorMessage={`Username length should be at least ${Constants.MIN_USERNAME_LENGTH} and at most ${Constants.MAX_USERNAME_LENGTH}`}
                />
                <Input
                    name="Password"
                    type="password"
                    onChange={evt => this.updatePassword(evt)}
                    forceShowErrors={this.state.forceShowErrors}
                    valid={this.validatePassword()}
                    errorMessage={`Password length should be at least ${Constants.MIN_PASSWORD_LENGTH} and at most ${Constants.MAX_PASSWORD_LENGTH}`}
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

    renderSubmitButton() {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => this.onSubmit()}
                className={this.props.classes.button}
            >
                Login
            </Button>
        );
    }

    renderRememberMe() {
        return (
            <div style={{ alignSelf: "center" }}>
                <SmartCheckbox
                    store={this.props.store}
                    message={"Remember Me"}
                    checked={this.props.rememberMeChecked}
                    onChange={() =>
                        this.props.changeRememberMeValue(
                            !this.props.rememberMeChecked
                        )
                    }
                />
            </div>
        );
    }

    /**
     * Should be implemented by subclass
     */
    renderTransitionText() {
        return (
            <Box textAlign="center">
                <Typography variant="body1" color="textSecondary">
                    Not registered?{" "}
                    <Link to="/register">Create an account</Link>
                </Typography>
            </Box>
        );
    }

    render() {
        const { classes } = this.props;
        // console.log("Current login infp", this.props.rememberMeChecked, this.props.currentLoginInfo);
        return (
            <div className={classes.root}>
                {this.renderHeading()}
                <Paper className={classes.paper}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        // alignItems="center"
                    >
                        {this.renderErrorMessage()}
                        {this.renderFormFields()}
                        {this.renderSubmitButton()}
                        {this.renderRememberMe()}
                        {this.renderTransitionText()}
                    </Grid>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        rememberMeChecked: state.rememberMeChecked
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changeRememberMeValue: newValue =>
            dispatch(changeRememberMeValue(newValue))
    };
};

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withStyles(styles)(GeneralStart));
