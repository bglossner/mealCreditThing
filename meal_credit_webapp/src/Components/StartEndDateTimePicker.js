import React from 'react';
import DateTimePicker from "./DateTimePicker";

class StartEndDateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                valid: true,
                who: -1,
            },
        };
    }

    setStateIfNeeded(error) {
        if ((this.state.error.who !== error.who) || (this.state.error.valid !== error.valid)) {
            this.setState({
                error: error,
            });
        }
    }

    handleDateTimeChange = (which) => (dateTime) => {
        // console.log("HERE", dateTime);
        let startTime = this.props.startTime, endTime = this.props.endTime;
        if (which === "startTime") {
            startTime = dateTime;
        } else {
            endTime = dateTime;
        }
        let isValidChange = this.validateStartEndTime(startTime, endTime);
        this.props.errorSetter(isValidChange.valid);
        (this.props.handleInParent(which))(dateTime);
        this.setStateIfNeeded(isValidChange);
    }

    validateStartEndTime(startTime, endTime) {
        // console.log(startTime, endTime);
        if ((startTime && endTime) && (startTime.getTime() > endTime.getTime())) {
            return {
                valid: false,
                who: 2,
                errorMessage: "End time/date must be after start time/date"
            };
        } else if (endTime && (endTime.getTime() < (new Date().getTime()))) {
            return {
                valid: false,
                who: 1,
                errorMessage: "End time must be after current date/time"
            };
        }
        return {
            valid: true,
            who: -1,
        };
    }

    render() {
        return (
            <React.Fragment>
                <DateTimePicker
                    selectedDate={this.props.startTime}
                    label="Start"
                    handleDateChange={this.handleDateTimeChange("startTime")}
                    hasError={false}
                    error={this.state.error}
                />
                <DateTimePicker
                    selectedDate={this.props.endTime}
                    label="End"
                    handleDateChange={this.handleDateTimeChange("endTime")}
                    hasError={!this.state.error.valid && this.state.error.who > -1}
                    error={this.state.error}
                />
            </React.Fragment>
        );
    }
}

export default (StartEndDateTimePicker);