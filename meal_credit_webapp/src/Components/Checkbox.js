import PropTypes from "prop-types";
import React from "react";

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    handleClick() {
        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        this.props.store.dispatch({
            type: "CHECKBOX_CHANGED",
            isChecked: this.state.checked
        });
        const className =
            "remember-me " +
            (this.state.checked
                ? "checked-remember-me"
                : "unchecked-remember-me");
        return (
            <React.Fragment>
                <div className="remember-me-div">
                    <input
                        onClick={() => this.handleClick()}
                        id="remember-me-checkbox"
                        type="checkbox"
                        className={className}
                        name="remember-me-check"
                    />
                    <label htmlFor="remember-me-checkbox">
                        <span>{this.props.message}</span>
                    </label>
                </div>
            </React.Fragment>
        );
    }
}

Checkbox.propTypes = {
    message: PropTypes.string
};
