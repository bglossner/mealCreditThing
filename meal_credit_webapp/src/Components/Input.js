import React, { Component } from "react";

import PropTypes from "prop-types";

const styles = {
    container: { marginBottom: 10 },
    errorLabel: {
        color: "red",
        textAlign: "left",
        fontSize: 12
    },
    input: {}
};

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            border: "",
            showErrorLabel: false
        };
    }

    onFocusOut() {
        if (this.props.valid) {
            this.setState({
                border: "green 1px solid"
            });
        } else {
            this.setState({
                border: "red 1px solid",
                showErrorLabel: true
            });
        }
    }

    render() {
        const statusStyle = {
            border: this.state.border,
            borderRadius: 6
        };
        return (
            <div style={styles.container}>
                <input
                    onBlur={this.onFocusOut.bind(this)}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    className="non-checkbox"
                    style={statusStyle}
                    onChange={this.props.onChange}
                />
                {this.state.showErrorLabel && (
                    <p style={styles.errorLabel}>{this.props.errorMessage}</p>
                )}
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    showStatus: PropTypes.bool,
    successStatus: PropTypes.bool,
    errorMessage: PropTypes.string
};

export default Input;
