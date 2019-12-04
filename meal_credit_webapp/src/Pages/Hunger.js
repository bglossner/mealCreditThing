import { connect } from "react-redux";
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
            transformedJSON.av_id = this.state.myPosts[listKey].av_id;
            retPromise = this.props.apiWrapper.editHungerPost(transformedJSON);
        }

        super.dealWithSubmissionResult(retPromise);
    };

    deletePost = (listKey) => {
        let deletionJSON = {
            hg_id: this.state.myPosts[listKey].hg_id,
        };
        let retPromise = this.props.apiWrapper.deleteHungerPost(deletionJSON);
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