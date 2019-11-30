import React from "react";
import { withStyles, Grid, Box, Typography, Button } from "@material-ui/core";
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
            modalInfo: {
                innerInfo: this.getDefaultModalInfo()
            },
            locations: null,
            errorStates: [false, false, false],
        };
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
        return {
            startTime: startTime,
            endTime: null,
            askingPrice: null,
            location: null,
        };
    }

    getCurrentModalInfo(field) {
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
        console.log(field, newInfo);
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

    validateAskingPrice() {
        const price = this.getCurrentModalInfo("askingPrice");
        if (price) {
            const numPrice = Number(price);
            if (numPrice > 20 && numPrice <= 20) {
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
    }

    validatePostForSubmission() {
        this.props.onSubmit(this.state.modalInfo);
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
                                defaultValue={this.props.type === "Edit" ? this.props.initialValues.askingPrice : ""}
                                required={true}
                                onChange={this.handleEventChange("askingPrice")}
                                forceShowErrors={true}
                                margin="none"
                                checkInput={this.validateAskingPrice()}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.rightAlign}
                            endIcon={<CheckIcon />}
                            onClick={() => this.validatePostForSubmission()}
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