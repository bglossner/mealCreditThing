import React from "react";
import { connect } from "react-redux";
import AvailabilityPost from "../Components/AvailabilityPost";
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
    addButton: {
        position: "sticky",
        bottom: "2vh",
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "2vh"
    },
});

class Availability extends Listings {

    getTitle() {
        return `${this.state.modalType} Availability Post`;
    }

    onSubmit = (jsonPostInfo, listKey) => {
        let transformedJSON = this.props.apiWrapper.getTransformedJSON(jsonPostInfo);
        let retPromise;
        if (this.state.modalType === "Add") {
            // console.log(jsonPostInfo);
            retPromise = this.props.apiWrapper.makeAvailabilityPost(transformedJSON);
        } else {
            transformedJSON.av_id = this.state.myPosts[listKey].av_id;
            retPromise = this.props.apiWrapper.editAvailabilityPost(transformedJSON);
        }

        retPromise
            .then((result) => {
                // console.log(result);
                let myPosts = this.state.myPosts.slice();
                transformedJSON.username = this.props.loginInfo.username;
                if (this.state.modalType === "Add") {
                    myPosts.push(transformedJSON);
                } else {
                    myPosts[listKey] = transformedJSON;
                }
                this.setState({
                    myPosts: myPosts,
                    modalOpen: false, 
                });
            })
            .catch((reason) => {
                console.log(reason)
            });
    };

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

    makePostType(postInfo, isMyPosts, listKey) {
        return (
            <AvailabilityPost
                username={postInfo.username}
                userId={postInfo.user_id}
                location={postInfo.location}
                askingPrice={postInfo.asking_price}
                startTime={postInfo.start_time}
                endTime={postInfo.end_time}
                allowEdits={isMyPosts}
                listKey={listKey}
                editPost={this.editPost}
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