import { connect } from "react-redux";
import Listings from "./Listings";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    addButton: {
        position: "absolute",
        bottom: "2vh",
        right: 0,
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "2vh"
    },
});

class Hunger extends Listings {

    getTitle() {
        return `${this.state.modalType} Hunger Post`;
    }

    onSubmit = (jsonPostInfo, listKey) => {
        let transformedJSON = this.props.apiWrapper.getTransformedJSON(jsonPostInfo);
        let retPromise;
        if (this.state.modalType === "Add") {
            // console.log(jsonPostInfo);
            retPromise = this.props.apiWrapper.makeHungerPost(transformedJSON);
        } else {
            transformedJSON.hg_id = this.state.myPosts[listKey].hg_id;
            retPromise = this.props.apiWrapper.editHungerPost(transformedJSON);
        }

        super.dealWithSubmissionResult(retPromise, transformedJSON, listKey);
    };

    deletePost = (listKey) => {
        let retPromise = this.props.apiWrapper.deleteHungerPost(this.state.myPosts[listKey].hg_id);
        retPromise
            .then((result) => {
                console.log(result);
            })
            .catch((reason) => console.log(reason));
    }

    getAllCurrentPosts() {
        let retVal = this.props.apiWrapper.getHungerPosts();
        super.setPosts(retVal);
    }

    getModalSpecifics() {
        return {
            priceFieldName: "maxPrice",
            serverPriceFieldName: "max_price",
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
)(withStyles(styles)(Hunger));