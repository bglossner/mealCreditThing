import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import PropTypes from 'prop-types';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.inputLabel = React.createRef();
        this.state = {
            labelWidth: 0,
        }
    }

    componentDidMount() {
        this.setState({
            labelWidth: this.inputLabel.current.offsetWidth,
        });
    }

    render() {
        const lowerLabel = this.props.label.toLowerCase();
        // console.log("Value change:", this.props.value)
        return (
            <FormControl variant="outlined" className={this.props.formControlClass}>
                <InputLabel ref={this.inputLabel} htmlFor={`outlined-${lowerLabel}-native-simple`}>
                    { this.props.label }
                </InputLabel>
                <Select
                    native
                    required={this.props.required}
                    value={this.props.value || ""}
                    onChange={this.props.onChange}
                    labelWidth={this.state.labelWidth}
                    inputProps={{
                        name: lowerLabel,
                        id: `outlined-${lowerLabel}-native-simple`,
                    }}
                >
                    { this.props.options }
                </Select>
            </FormControl>
        );
    }
}

Selector.propTypes = {
    options: PropTypes.array,
    value: PropTypes.string,
    label: PropTypes.string,
    formControlClass: PropTypes.string,
    required: PropTypes.bool
};

export default (Selector);