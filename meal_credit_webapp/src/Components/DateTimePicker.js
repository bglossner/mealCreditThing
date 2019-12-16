import { KeyboardTimePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'date-fns';
import { Box } from "@material-ui/core";
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

class DateTimePicker extends React.Component {

    render() {
        let dateError = {
            error: this.props.hasError || false,
            helperText: this.props.hasError ? this.props.error.errorMessage : ""
        };
        let timeError = {
            error: dateError.error,
            helperText: ""
        };
        return (
            <Box>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        {...dateError}
                        margin="normal"
                        id={`date-picker-dialog-${this.props.label.toLowerCase()}`}
                        label={`${this.props.label} Date`}
                        format="MM/dd/yyyy"
                        value={this.props.selectedDate}
                        onChange={this.props.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': `change ${this.props.label.toLowerCase()} date`,
                        }}
                    />
                    <KeyboardTimePicker
                        {...timeError}
                        margin="normal"
                        id={`date-picker-dialog-${this.props.label.toLowerCase()}`}
                        label={`${this.props.label} Time`}
                        value={this.props.selectedDate}
                        onChange={this.props.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': `change ${this.props.label.toLowerCase()} time`,
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
        );
    }
}

export default (DateTimePicker);