import React from "react";
import { withStyles, Grid, Box, Typography, Button } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import GeneralModal from "./GeneralModal";
import Selector from "../Components/Selector";
import StartEndDateTimePicker from "../Components/StartEndDateTimePicker";
import Input from "../Components/Input";
import CheckIcon from '@material-ui/icons/Check';

const styles = theme => ({
    clickableIcon: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
        minWidth: 120,
    },
    rightAlign: {
        marginLeft: "auto",
    },
    centerFlex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
});

class ListingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forceShowErrors: true,
            showSubmissionErrors: false,
            submissionMessage: "",
            modalInfo: {
                innerInfo: this.getDefaultModalInfo()
            },
            locations: null,
            errorStates: [false, false, false],
        };
        this.getAllLocations();
    }

    resetModalState() {
        this.setState({
            showSubmissionErrors: false,
            submissionMessage: "",
            modalInfo: {
                innerInfo: this.getDefaultModalInfo(),
            },
            errorStates: [false, false, false],
        });
    }

    componentDidUpdate(prevProps) {
        if ((this.props.open !== prevProps.open) && (prevProps.open === false)) {
            this.resetModalState();
        }
    }

    getAllLocations() {
        let retVal = this.props.apiWrapper.getAllLocations();
        retVal
            .then(locations => {
                this.setState({
                    locations: locations,
                });
            })
            .catch(reason => {
                console.log(reason)
            });
    }

    renderErrorMessage() {
        // console.log(this.state.showSubmissionErrors, this.state.submissionMessage.length)
        return (
            this.state.showSubmissionErrors && this.state.submissionMessage.length !== 0 && (
                <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="center"
                >
                    <Alert variant="danger">{this.state.submissionMessage}</Alert>
                </Grid>
            )
        );
    }

    validateSubmission() {
        for (let key in this.state.modalInfo.innerInfo) {
            if (key !== "startTime" && (this.getCurrentModalInfo(key) === null)) {
                return {
                    valid: false,
                    errorMessage: `Please fill out the ${this.fieldTransform[key]} field`
                };
            }
        }
        let tempStates = this.state.errorStates.slice();
        tempStates[1] = this.validatePrice().valid === false;
        for (let state of tempStates) {
            if (state === true) {
                return {
                    valid: false,
                    errorMessage: "Please fix all errors shown!"
                }
            }
        }

        return {
            valid: true
        };
    }

    errorSetter = (childNum) => (childErrorState) => {
        let errorStates = this.state.errorStates.slice();
        if (errorStates[childNum] !== childErrorState) {
            errorStates[childNum] = childErrorState;
            this.setState({
                errorStates: errorStates,
            });
        }
    }

    getDefaultModalInfo(startTime = null) {
        // console.log(this.props.defaultValues);
        let defaultObj = {
            startTime: this.props.defaultValues ? new Date(this.props.defaultValues.start_time) : startTime,
            endTime: this.props.defaultValues ? new Date(this.props.defaultValues.end_time) : null,
            location: this.props.defaultValues ? this.props.defaultValues.location : null,
        };
        defaultObj[this.props.priceFieldName] = this.props.defaultValues ? 
            this.props.defaultValues[this.props.serverPriceFieldName].toString() : null;
        return defaultObj;
    }

    getCurrentModalInfo(field) {
        // console.log(field, this.state.modalInfo.innerInfo[field]);
        return this.state.modalInfo.innerInfo ? this.state.modalInfo.innerInfo[field] : null;
    }

    setCurrentModalInfo(field, value) {
        let curModalInfo = Object.assign({}, this.state.modalInfo);
        if (this.state.modalInfo.innerInfo) {
            curModalInfo.innerInfo[field] = value;
            this.setState({
                modalInfo: curModalInfo,
            });
        }
    }

    handleEventChange = (field) => (event) => {
        this.setCurrentModalInfo(field, event.target.value);
    }

    handleNonEventChange = (field) => (newInfo) => {
        // console.log(field, newInfo);
        this.setCurrentModalInfo(field, newInfo);
    }

    getLocationOptions() {
        if (!this.state.locations) {
            return null;
        }
        let newArray = [<option key={-1} value="" />]
        newArray.push(...(this.state.locations.map((location, step) => {
            return <option key={step} value={location}>{location}</option>
        })));
        return newArray;
    }

    validatePrice() {
        const price = this.getCurrentModalInfo(this.props.priceFieldName);
        console.log(this.props.priceFieldName);
        if (price) {
            const numPrice = Number(price);
            if (numPrice > 20) {
                return {
                    valid: false,
                    errorMessage: "Price can not be over $20"
                };
            }
            const decimalIndex = price.indexOf(".");
            if (decimalIndex > -1) {
                if (!price.match(/^[0-9]{0,2}\.[0-9]{0,2}$/g)) {
                    return {
                        valid: false,
                        errorMessage: "Price must have less than two numbers after decimal"
                    };
                }
            }
            return {
                valid: true,
                errorMessage: "",
            };
        }
        return {
            valid: true,
        }
    }

    attemptSubmission() {
        let validationResults = this.validateSubmission();
        // console.log(validationResults);
        if (!validationResults.valid) {
            this.setState({
                showSubmissionErrors: true,
                submissionMessage: validationResults.errorMessage
            });
        } else {
            this.props.onSubmit(this.state.modalInfo.innerInfo, this.props.listKey);
            this.resetModalState();
        }
    }

    getDefaultPrice() {
        console.warn("getDefaultPrice should be defined in subclass");
    }
    
    render() {
        const { classes } = this.props;
        return (
            <GeneralModal
                onClose={this.props.onClose}
                open={this.props.open}
                title={this.props.title}
            >
                <Grid
                    container
                    direction="column"
                >
                    { this.renderErrorMessage() }
                    <StartEndDateTimePicker
                        startTime={this.getCurrentModalInfo("startTime")}
                        endTime={this.getCurrentModalInfo("endTime")}
                        errorSetter={this.errorSetter(0)}
                        handleInParent={this.handleNonEventChange}
                    />
                    <Selector
                        value={this.getCurrentModalInfo("location")}
                        onChange={this.handleEventChange("location")}
                        formControlClass={classes.formControl}
                        options={this.getLocationOptions()}
                        label="Location"
                        required={true}
                        errorSetter={this.errorSetter(1)}
                    />
                    <Box
                        className={`${classes.centerFlex} ${classes.formControl}`}
                    >
                        <Box
                            className={classes.centerFlex}
                        >
                            <Typography variant="h6">
                                $
                            </Typography>
                            <Input
                                name="Price"
                                type="number"
                                defaultValue={this.props.type === "Edit" ? this.getCurrentModalInfo(this.props.priceFieldName) : ""}
                                required={true}
                                onChange={this.handleEventChange(this.props.priceFieldName)}
                                forceShowErrors={true}
                                margin="none"
                                checkInput={this.validatePrice()}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.rightAlign}
                            endIcon={<CheckIcon />}
                            onClick={() => this.attemptSubmission()}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </GeneralModal>
        );
    }
}

export default withStyles(styles)(ListingModal);