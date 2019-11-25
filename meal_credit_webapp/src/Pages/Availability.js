import React from "react";
import { connect } from "react-redux";
import { withStyles, List, ListSubheader, ListItem } from "@material-ui/core";
import AvailabilityPost from "../Components/AvailabilityPost";

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    postList: {
        backgroundColor: theme.palette.primary.main,
        width: "30%",
    },
    listItem: {
        display: "flex",
        justifyContent: "center",
    },
});

class Availability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPosts: null,
        };
        this.getAllCurrentPosts();
    }

    getAllCurrentPosts() {
        let retVal = this.props.apiWrapper.getAvailabilityPosts();
        retVal
            .then(posts => {
                //console.log(posts);
                this.setState({
                    currPosts: posts,
                });
            })
            .catch(reason => {
                console.log(reason)
            });
    }

    render() {
        const { classes } = this.props;
        let listItems;
        if (this.state.currPosts !== null) {
            // console.log(this.state.currPosts);
            listItems = this.state.currPosts.slice(0, 3).map((postInfo, step) => {
                // console.log(postInfo, step);
                return (
                    <ListItem className={classes.listItem} key={step} divider button>
                        <AvailabilityPost
                            username={postInfo.username}
                            userId={postInfo.user_id}
                            fullname={postInfo.fullname}
                            location={postInfo.location}
                            askingPrice={postInfo.asking_price}
                            startTime={postInfo.start_time}
                            endTime={postInfo.end_time}
                        />
                    </ListItem>
                );
            });
        }
        return (
            <React.Fragment>
                <div className={classes.toolbar} />
                <List subheader={<ListSubheader>Latest Posts</ListSubheader>} className={classes.postList}>
                    { listItems }
                </List>
            </React.Fragment>
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