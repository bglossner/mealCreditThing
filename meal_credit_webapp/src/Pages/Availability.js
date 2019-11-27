import React from "react";
import { connect } from "react-redux";
import AvailabilityPost from "../Components/AvailabilityPost";
import DateTimePicker from "../Components/DateTimePicker";
import Listings from "./Listings";
import { withStyles } from "@material-ui/core";

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
    }
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
                innerInfo: super.getDefaultModalInfo(),
            }
        });
    }

    renderInnerModal() {
        if (this.state.modalInfo === undefined) {
            return null;
        }
        // console.log(this.state.modalInfo)
        return (
            <DateTimePicker
                selectedDate={super.getCurrentModalInfo("startTime")}
                handleDateChange={super.handleStartTimeChange}
            />
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
        return <AvailabilityPost
            username={postInfo.username}
            userId={postInfo.user_id}
            location={postInfo.location}
            askingPrice={postInfo.asking_price}
            startTime={postInfo.start_time}
            endTime={postInfo.end_time}
        />;
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