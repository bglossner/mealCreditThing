import React from "react";
import { Grid, Typography, Box, TextField, Button, withStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TimeRangePicker from "./TimeRangePicker";
import Input from "./Input";
import Selector from "./Selector";
import SmartCheckbox from "./Checkbox";

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
    italic: {
        fontStyle: "italic",
    },
    topMargin: {
        marginTop: "3%",
    },
});

class FilterPane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {
                valid: true,
                who: -1,
            },
            filterInfo: this.getDefaultInfo(),
            errorStates: [false, false, false, false],
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

    errorSetter = (index) => (value) => {
        if (this.state.errorStates[index] !== value) {
            let curErrorState = this.state.errorStates.slice();
            curErrorState[index] = value;
            this.setState({
                errorStates: curErrorState,
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
                handleInParent={this.handleChange(false)}
                startTime={this.state.filterInfo.startTime}
                endTime={this.state.filterInfo.endTime}
                errorSetter={this.errorSetter(0)}
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
                    /* checkInput={this.validatePrice()} */
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

    attemptFilter() {
        let jsonFilterInfo = {}, i, value;
        for (i = 0; i < this.indexLabeling.length; i++) {
            value = this.state.filterInfo[this.indexLabeling[i]];
            if (this.state.checkboxStates[i + 1] && value !== null) {
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
        console.log(jsonFilterInfo)
        this.props.filter(jsonFilterInfo);
    }

    render() {
        const { classes } = this.props;
        // console.log(this.state.filterInfo);
        return (
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.mainContainer}
            >
                <Box className={`${classes.fullWidth} ${classes.horizBox}`}>
                    <Typography className={classes.italic} variant="h5">
                        Filter Menu
                    </Typography>
                </Box>
                { this.renderField(0, classes, this.renderTimeRangeFilter) }
                { this.renderField(1, classes, this.renderLocationFilter) }
                { this.renderField(2, classes, this.renderPriceFilter) }
                { this.renderField(3, classes, this.renderUsernameFilter) }
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