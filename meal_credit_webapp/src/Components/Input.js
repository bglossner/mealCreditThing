import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles, TextField } from "@material-ui/core";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        alignSelf: "stretch"
    }
});

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showErrorLabel: false
        };
    }

    triggerError() {
        if (this.props.valid) {
            this.setState({
                showErrorLabel: false
            });
        } else {
            this.setState({
                showErrorLabel: true
            });
        }
    }

    render() {
        const { classes } = this.props;
        let errorProps = {};
        if (
            (this.state.showErrorLabel && !this.props.valid) ||
            this.forceShowErrors
        ) {
            errorProps = {
                error: true,
                id: "standard-error-helper-text",
                helperText: this.props.errorMessage
            };
        }
        return (
            <TextField
                {...errorProps}
                required
                label={this.props.name}
                className={classes.textField}
                margin="normal"
                onKeyUp={() => this.triggerError()}
                onBlur={() => this.triggerError()}
                type={this.props.type}
                onChange={this.props.onChange}
                variant="outlined"
            />
        );
    }
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    showStatus: PropTypes.bool,
    successStatus: PropTypes.bool,
    errorMessage: PropTypes.string,
    forceShowErrors: PropTypes.bool
};

export default withStyles(styles)(Input);
