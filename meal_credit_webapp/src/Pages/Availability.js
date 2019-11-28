import React from "react";
import { connect } from "react-redux";
import AvailabilityPost from "../Components/AvailabilityPost";
import DateTimePicker from "../Components/DateTimePicker";
import Listings from "./Listings";
import { withStyles, Grid, InputAdornment, FormControl, InputLabel } from "@material-ui/core";
import Selector from "../Components/Selector";
import Input from "../Components/Input";

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    postList: {
        backgroundColor: theme.palette.primary.secondary,
        width: "30%",
        marginTop: "1%",
    },
    listItem: {
        display: "flex",
        justifyContent: "center",
    },
    listHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    clickableIcon: {
        cursor: "pointer",
        marginLeft: "5%",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});

class Availability extends Listings {
    
    setupPage() {
        this.getAllCurrentPosts();
        this.getAllLocations();
    }

    addNewPost() {
        this.setState({
            modalInfo: {
                open: true,
                type: "Add",
                innerInfo: super.getDefaultModalInfo(new Date()),
            }
        });
    }

    renderInnerModal(classes) {
        return (
            <Grid
                container
                direction="column"
            >
                <DateTimePicker
                    selectedDate={super.getCurrentModalInfo("startTime")}
                    handleDateChange={this.handleNonSelectChange("startTime")}
                />
                <DateTimePicker
                    selectedDate={super.getCurrentModalInfo("endTime")}
                    handleDateChange={this.handleNonSelectChange("endTime")}
                />
                <Selector
                    value={super.getCurrentModalInfo("location")}
                    onChange={this.handleSelectChange("location")}
                    formControlClass={classes.formControl}
                    options={super.getLocationOptions()}
                    label="Location"
                    required={true}
                />
                {/* <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-amount">
                        Amount
                    </InputLabel>
                    <Input
                        id="modal-price"
                        label="Price"
                        type="number"
                        required
                        onChange={this.handleNonSelectChange("askingPrice")}
                        className={classes.textField}
                        margin="normal"
                        startAdornment={
                            <InputAdornment
                                position="start"
                            >
                                $
                            </InputAdornment>
                        }
                    />
                </FormControl> */}
                <Input
                    name="Price"
                    type="number"
                    required={true}
                    /*onChange={evt => this.updatePassword(evt)}
                    forceShowErrors={this.state.forceShowErrors}
                    checkInput={this.validatePassword()}*/
                />
            </Grid>
        );
    }

    getTitle() {
        return `${this.state.modalInfo.type} Availability Post`;
    }

    getAllCurrentPosts() {
        let retVal = this.props.apiWrapper.getAvailabilityPosts();
        retVal
            .then(posts => {
                let myPosts = [], otherPosts = [];
                for (let post of posts) {
                    if (this.props.loginInfo && (post.user_id === this.props.loginInfo.user_id)) {
                        myPosts.push(post);
                    } else {
                        otherPosts.push(post);
                    }
                }
                this.setState({
                    currPosts: otherPosts.length === 0 ? null : otherPosts,
                    myPosts: myPosts.length === 0 ? null : myPosts,
                });
            })
            .catch(reason => {
                console.log(reason)
            });
    }

    makePostType(postInfo) {
        return (
            <AvailabilityPost
                username={postInfo.username}
                userId={postInfo.user_id}
                location={postInfo.location}
                askingPrice={postInfo.asking_price}
                startTime={postInfo.start_time}
                endTime={postInfo.end_time}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        loginInfo: state.userLoginInfo,
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(Availability));