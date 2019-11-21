import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";

import { Alert } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import SmartCheckbox from "../Components/Checkbox";

// const styles = theme => ({
//     root: {
//         height: "80vh",
//         flexGrow: 1,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column"
//     },
//     button: {
//         margin: theme.spacing(1),
//         alignSelf: "stretch",
//         padding: theme.spacing(1),
//         fontSize: theme.spacing(2)
//     },
//     paper: {
//         padding: theme.spacing(2),
//         margin: theme.spacing(2),
//         textAlign: "center",
//         color: theme.palette.text.secondary,
//         width: "45%",
//         maxWidth: "450px",
//         minWidth: "300px"
//     }
// });

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

    handleLoginErrors(error) {
        this.setState({
            error: {
                status: error.status,
                message: error.message
            }
        });
    }

    /**
     * Render Functions
     */
    getHeadingText() {
        console.warn("getHeadingText() should be implemented in subclasses");
    }

    renderHeading() {
        // console.warn("This should be implemented in subclasses");
        return (
            <Grid
                container
                alignItems="center"
                direction="row"
                justify="center"
            >
                <FaLock size={50} />
                <Box textAlign="center" display="block" p={1} m={1}>
                    <Typography variant="h2" color="textSecondary">
                        {this.getHeadingText()}
                    </Typography>
                </Box>
            </Grid>
        );
    }

    renderErrorMessage() {
        return (
            this.state.error.message && (
                <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="center"
                >
                    <Alert variant="danger">{this.state.error.message}</Alert>
                </Grid>
            )
        );
    }

    /**
     * Should be implemented by subclass
     */

    renderFormFields() {
        console.warn("renderFormFields() should be implemented in subclasses");
    }

    /**
     * Should be implemented by subclass
     */
    onSubmit() {
        console.warn("onSubmit() should be implemented in subclasses");
        // this.attemptLogin();
    }

    getSubmitButtonText() {
        console.warn(
            "getSubmitButtonText() should be implemented in subclasses"
        );
    }

    renderSubmitButton() {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => this.onSubmit()}
                className={this.props.classes.button}
            >
                {this.getSubmitButtonText()}
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

    renderTransitionContainer() {
        return (
            <Box textAlign="center">
                <Typography variant="body1" color="textSecondary">
                    {this.renderTransitionText()}
                </Typography>
            </Box>
        );
    }

    /**
     * Should be implemented by subclass
     */
    renderTransitionText() {
        console.warn(
            "renderTransitionText() should be implemented in subclasses"
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
                        {this.renderTransitionContainer()}
                    </Grid>
                </Paper>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         rememberMeChecked: state.rememberMeChecked
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         changeRememberMeValue: newValue =>
//             dispatch(changeRememberMeValue(newValue))
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withStyles(styles)(GeneralStart));
