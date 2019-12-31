import React from "react";
import { Grid, Typography, Box, TextField, Button, withStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TimeRangePicker from "./TimeRangePicker";
import Input from "./Input";
import { Alert } from "react-bootstrap";
import Selector from "./Selector";
import SmartCheckbox from "./Checkbox";
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    mainContainer: {
        padding: theme.spacing(1),
        backgroundColor: "white",
    },
    fullWidth: {
        width: "100%",
    },
    horizBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "5%",
    },
    center: {
        margin: "auto",
    },
    title: {
        fontStyle: "italic",
        marginRight: "25%",
    },
    titleBox: {
        justifyContent: "flex-end",
    },
    topMargin: {
        marginTop: "3%",
    },
    cancel: {
        backgroundColor: "transparent",
        color: "red",
    },
});

class FilterPane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {
                valid: true,
                message: "",
            },
            filterInfo: this.getDefaultInfo(),
            errorInDates: false,
            checkboxStates: [false, false, false, false],
        };
        this.checkBoxLabels = ["Time Range", "Location", "Price", "Username"];
        this.sortByOptions = ["Date", "Location", "Price", "Username"];
        this.indexLabeling = ["location", this.props.priceFieldName, "username"];
    }

    getDefaultInfo() {
        let defaultInfo = {
            location: null,
            username: null,
            startTime: null,
            endTime: null,
            sortingBy: "price",
        }
        defaultInfo[this.props.priceFieldName] = null;
        return defaultInfo;
    }

    resetFilterInfo() {
        this.setState({
            error: {
                valid: true,
                who: -1,
            },
            filterInfo: this.getDefaultInfo(),
        });
    }

    setCurrentFilterInfo(field, value) {
        let curFilterInfo = Object.assign({}, this.state.filterInfo);
        if (this.state.filterInfo && (this.state.filterInfo[field] !== value)) {
            curFilterInfo[field] = value;
            this.setState({
                filterInfo: curFilterInfo,
            });
        }
    }

    handleChange = (isEventChange) => (field) => (newInfo) => {
        // console.log(field, isEventChange ? newInfo.target.value : newInfo);
        this.setCurrentFilterInfo(field, isEventChange ? newInfo.target.value : newInfo);
    }

    getSortByOptions() {
        let newArray = [];
        newArray.push(...(this.sortByOptions.map((option, step) => {
            return <option key={step} value={option.toLowerCase()}>{option}</option>
        })));
        return newArray;
    }

    errorSetter = (key, value) => {
        if (this.state[key] !== value) {
            this.setState({
                [key]: value,
            });
        }
    }

    onCheckBoxChange = (index) => {
        let checkBoxStates = this.state.checkboxStates.slice();
        checkBoxStates[index] = !checkBoxStates[index];
        this.setState({
            checkboxStates: checkBoxStates,
        });
    }

    renderField(index, classes, conditionalCallback) {
        return (
            <Box className={classes.fullWidth}>
                <SmartCheckbox
                    onChange={() => this.onCheckBoxChange(index)}
                    message={this.checkBoxLabels[index]}
                    checked={this.state.checkboxStates[index]}
                />
                { this.state.checkboxStates[index] ? conditionalCallback(classes) : null }
            </Box>
        );
    }

    renderLocationFilter = (classes) => {
        return (
            <Autocomplete
                multiple
                id="tags-outlined"
                className={classes.fullWidth}
                options={this.props.locations}
                getOptionLabel={option => option}
                onChange={(evt, value) => this.handleChange(false)("location")(value)}
                filterSelectedOptions
                disabled={this.props.locations === null || this.props.locations === [] }
                renderInput={params => (
                    <TextField
                        className={classes.fullWidth}
                        {...params}
                        variant="outlined"
                        label="Locations"
                        placeholder="Locations"
                    />
                )}
            />
        );
    }

    renderTimeRangeFilter = (classes) => {
        return (
            <TimeRangePicker
                firstPickerLabel="From"
                lastPickerLabel="To"
                optionalID="filterRange"
                handleInParent={this.handleChange(false)}
                startTime={this.state.filterInfo.startTime}
                endTime={this.state.filterInfo.endTime}
                errorSetter={(value) => this.errorSetter("errorInDates", value)}
            />
        );
    }

    renderPriceFilter = (classes) => {
        return (
            <Box
                className={classes.horizBox}
            >
                <Typography variant="h6">
                    $
                </Typography>
                <Input
                    name={this.props.filterPriceName}
                    type="number"
                    defaultValue={null}
                    required={false}
                    onChange={(this.handleChange(true))(this.props.priceFieldName)}
                    forceShowErrors={true}
                    margin="none"
                    checkInput={this.validatePrice()}
                />
            </Box>
        );
    }

    renderUsernameFilter = (classes) => {
        return (
            <Box className={`${classes.horizBox} ${classes.fullWidth}`}>
                <Input
                    name="Username"
                    type="text"
                    defaultValue={null}
                    required={false}
                    onChange={(this.handleChange(true))("username")}
                    forceShowErrors={true}
                    margin="none"
                />
            </Box>
        );
    }

    validatePrice() {
        const price = this.state.filterInfo[this.props.priceFieldName];
        if (price && this.state.checkboxStates[2]) {
            const decimalIndex = price.indexOf(".");
            if (decimalIndex > -1) {
                if (!price.match(/^[0-9]{0,2}\.[0-9]{0,2}$/g)) {
                    return {
                        valid: false,
                        errorMessage: "Price must have less than two numbers after decimal"
                    };
                }
            }
        }

        return {
            valid: true,
        }
    }

    validateFilterInfo() {
        let validPrice = this.validatePrice(), invalidDate = this.state.errorInDates && this.state.checkboxStates[0];
        if (!validPrice.valid || invalidDate) {
            return {
                valid: false,
                errorMessage: validPrice.valid ? "Please fix any date/time errors below" : validPrice.errorMessage,
            }
        }

        return {
            valid: true
        }
    }

    renderErrorMessage() {
        if (!this.state.error.valid) {
            return (
                <Grid
                        container
                        alignItems="center"
                        direction="row"
                        justify="center"
                >
                    <Alert variant="danger">{this.state.error.message}</Alert>
                </Grid>
            );
        }

        return null;
    }

    attemptFilter() {
        let jsonFilterInfo = {}, i, value;
        for (i = 0; i < this.indexLabeling.length; i++) {
            value = this.state.filterInfo[this.indexLabeling[i]];
            if ((this.state.checkboxStates[i + 1]) && (value !== null) && (value !== "")) {
                jsonFilterInfo[this.indexLabeling[i]] = value;
            }
        }
        jsonFilterInfo["sortBy"] = this.state.filterInfo["sortingBy"];
        value = this.state.filterInfo["startTime"];
        if (this.state.checkboxStates[0] && value !== null) {
            jsonFilterInfo["startTime"] = value.toISOString();
        }
        value = this.state.filterInfo["endTime"];
        if (this.state.checkboxStates[0] && value !== null) {
            jsonFilterInfo["endTime"] = value.toISOString();
        }
        
        let validityCheck = this.validateFilterInfo();
        if (validityCheck.valid) {
            this.props.filter(jsonFilterInfo);
            this.setState({
                error: {
                    valid: true,
                    message: "",
                }
            });
        } else {
            this.setState({
                error: {
                    valid: false,
                    message: validityCheck.errorMessage
                }
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.mainContainer}
            >
                <Box className={`${classes.fullWidth} ${classes.horizBox} ${classes.titleBox}`}>
                    <Typography className={classes.title} variant="h5">
                        {`Filter ${this.props.for}`}
                    </Typography>
                    <Button
                        className={classes.cancel}
                        onClick={() => this.props.onClose()}
                    >
                        <CloseIcon />
                    </Button>
                </Box>
                { this.renderErrorMessage() }
                { this.renderField(0, classes, this.renderTimeRangeFilter) }
                { this.renderField(1, classes, this.renderLocationFilter) }
                { this.renderField(2, classes, this.renderPriceFilter) }
                { this.props.which === 0 ? this.renderField(3, classes, this.renderUsernameFilter) : null }
                <Selector
                    options={this.getSortByOptions()}
                    value={this.state.filterInfo.sortingBy}
                    label="Sorting By"
                    onChange={(evt) => this.handleChange(false)("sortingBy")(evt.target.value.toLowerCase())}
                    formControlClass={`${classes.fullWidth} ${classes.topMargin}`}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={`${classes.topMargin} ${classes.center}`}
                    onClick={() => this.attemptFilter()}
                >
                    Filter Posts
                </Button>
            </Grid>
        );
    }
}

export default withStyles(styles)(FilterPane);