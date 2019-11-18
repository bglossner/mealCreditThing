import React, { Component } from "react";

import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

class Error extends Component {
    render() {
        return <Alert variant="danger">{this.props.message}</Alert>;
    }
}

Error.propTypes = {
    message: PropTypes.string
};

export default Error;
