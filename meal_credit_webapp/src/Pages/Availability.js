import { connect } from "react-redux";
import Listings from "./Listings";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    addButton: {
        position: "absolute",
        bottom: "2vh",
        display: "flex",
        right: 0,
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

        super.dealWithSubmissionResult(retPromise, transformedJSON, listKey);
    };

    deletePost = (listKey) => {
        let deletionJSON = {
            av_id: this.state.myPosts[listKey].av_id,
        };
        let retPromise = this.props.apiWrapper.deleteAvailabilityPost(deletionJSON);
        retPromise
            .then((result) => {
                console.log(result);
            })
            .catch((reason) => console.log(reason));
    }

    getAllCurrentPosts() {
        let retVal = this.props.apiWrapper.getAvailabilityPosts();
        super.setPosts(retVal);
    }

    getModalSpecifics() {
        return {
            priceFieldName: "askingPrice",
            serverPriceFieldName: "asking_price",
        };
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