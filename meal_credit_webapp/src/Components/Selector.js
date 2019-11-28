import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

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
        return (
            <FormControl variant="outlined" className={this.props.formControlClass}>
                <InputLabel ref={this.inputLabel} htmlFor={`outlined-${lowerLabel}-native-simple`}>
                    { this.props.label }
                </InputLabel>
                <Select
                    native
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

export default (Selector);