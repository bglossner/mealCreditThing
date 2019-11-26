import React from "react";
import { Link } from "react-router-dom";

export default class Navlink extends React.Component {
    render() {
        const linkClass = `${this.props.classes.link} ${this.props.isActive ? this.props.classes.underline : '' }`;
        return (
            <Link
                onClick={ () => this.props.onClick() }
                className={linkClass}
                to={this.props.to}
            >
                { this.props.title }
            </Link>
        );
    }
}