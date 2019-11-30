import React, { Component } from "react";
import { TextField, withStyles } from "@material-ui/core";

import PropTypes from "prop-types";

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

    checkError() {
        if (this.props.checkInput.valid) {
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
            (this.state.showErrorLabel || this.props.forceShowErrors) &&
            !this.props.checkInput.valid
        ) {
            errorProps = {
                error: true,
                id: "standard-error-helper-text",
                helperText: this.props.checkInput.errorMessage
            };
        }
        return (
            <TextField
                {...errorProps}
                required={this.props.required}
                label={this.props.name}
                className={classes.textField}
                margin={this.props.margin || "normal"}
                defaultValue={this.props.defaultValue || ""}
                onKeyUp={() => this.checkError()}
                onBlur={() => this.checkError()}
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
    forceShowErrors: PropTypes.bool,
    checkInput: PropTypes.object
};

Input.defaultProps = {
    checkInput: { valid: true },
    required: true
};
export default withStyles(styles)(Input);
