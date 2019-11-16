import React, { Component } from "react";
import PropTypes from "prop-types";

class Ribbon extends Component {
    render() {
        const label = this.props.label === null ? "" : this.props.label;
        const style = {
            position: "absolute",
            background: "red",
            top: "50px",
            right: "-9.8vw",
            width: "10vw"
        };
        // delete props["label"];
        return (
            <div className="ribbon" style={style}>
                {label}
            </div>
        );
    }
}

Ribbon.propTypes = {};

export default Ribbon;
