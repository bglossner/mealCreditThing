import { connect } from "react-redux";
import Listings from "./Listings";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    addButton: {
        position: "sticky",
        bottom: "2vh",
        display: "flex",
        right: 0,
        justifyContent: "flex-end",
        marginRight: "2vh"
    },
    filterBox: {
        display: "flex",
        alignItems: "center",
        width: "33%",
        height: "100%",
        marginTop: "4%",
    },
});

class Availability extends Listings {

    getTitle() {
        return "Availability Posts";
    }

    getModalTitle() {
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
        let retPromise = this.props.apiWrapper.deleteAvailabilityPost(this.state.myPosts[listKey].av_id);
        retPromise
            .then((result) => {
                let slicedPosts = this.state.myPosts.slice();
                slicedPosts.splice(listKey, 1);
                this.setState({
                    myPosts: slicedPosts,
                });
            })
            .catch((reason) => console.log(reason));
    }

    onFilter = (json) => {
        return this.props.apiWrapper.getFilteredAvailabilityPosts(json);
    }

    getAllCurrentPosts() {
        let retVal = this.props.apiWrapper.getAvailabilityPosts();
        super.setPosts(retVal, -1);
    }

    getPriceSpecifics() {
        return {
            priceFieldName: "askingPrice",
            serverPriceFieldName: "asking_price",
            readablePriceName: "Asking Price",
            filterPriceName: "Max Price",
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