import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";
import React from "react";

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
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.props.checked}
                        onChange={this.props.onChange}
                        color="primary"
                    />
                }
                label={this.props.message}
            />
        );
    }
}

Checkbox.propTypes = {
    message: PropTypes.string
};

export default SmartCheckbox;
