import { Form, InputGroup, Row } from "react-bootstrap";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";
import React from "react";
import { changeRememberMeValue } from "../redux/actions/index";
import { connect } from "react-redux";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        "&$checked": {
            color: green[600]
        }
    },
    checked: {}
})(props => <Checkbox color="default" {...props} />);

class SmartCheckbox extends React.Component {
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
        // this.props.dispatch(changeRememberMeValue(this.state.checked));
        const className =
            "remember-me " +
            (this.state.checked
                ? "checked-remember-me"
                : "unchecked-remember-me");
        return (
            <FormControlLabel
                control={
                    <GreenCheckbox
                        checked={this.state.checked}
                        onChange={() => this.handleClick()}
                        value="gilad"
                    />
                }
                label="Remember Me"
            />
        );
    }
}

Checkbox.propTypes = {
    message: PropTypes.string
};

export default connect()(SmartCheckbox);
