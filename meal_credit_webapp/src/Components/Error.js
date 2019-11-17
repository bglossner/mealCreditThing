import "../css/user_error.css";

import React, { Component } from "react";

import PropTypes from "prop-types";

class Error extends Component {

    render() {
        return (
            <div className="user-error">
                <p className="error-msg">{this.props.message}</p>
            </div>
        );
    }
}

Error.propTypes = {
    message: PropTypes.string
};

export default Error;
