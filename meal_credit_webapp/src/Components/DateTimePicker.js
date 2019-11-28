import { KeyboardTimePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'date-fns';
import { Box } from "@material-ui/core";
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

class DateTimePicker extends React.Component {
    render() {
        return (
            <Box>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={this.props.selectedDate}
                        onChange={this.props.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={this.props.selectedDate}
                        onChange={this.props.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
        );
    }
}

export default (DateTimePicker);