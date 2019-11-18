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
                border: "green 1px solid",
                showErrorLabel: false
            });
        } else {
            this.setState({
                border: "red 1px solid",
                showErrorLabel: true
            });
        }
    }

    render() {
        if (this.props.forceShowErrors && this.state.border === "") {
            this.onFocusOut();
        }
        const statusStyle = {
            border: this.state.border,
            borderRadius: 6
        };
        return (
            <div style={styles.container}>
                <input
<<<<<<< Updated upstream
                    onBlur={this.onFocusOut.bind(this)}
=======
                    onKeyUp={() => this.onFocusOut()}
>>>>>>> Stashed changes
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
    errorMessage: PropTypes.string,
    forceShowErrors: PropTypes.bool
};

export default Input;
