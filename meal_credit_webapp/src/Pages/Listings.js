import React from "react";
import { List, Grid, Typography, Box, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ListingModal from "../Components/ListingModal";
import PostList from "../Components/PostList";

class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPosts: null,
            myPosts: null,
            modalType: null,
            modalOpen: false,
            editPostInfo: {
                postInfo: null,
                key: null,
            },
        };
        this.getAllCurrentPosts();
    }

    setPosts(apiPromise) {
        apiPromise
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
                console.log("ERROR", reason)
                this.setState({
                    currPosts: [],
                    myPosts: [],
                });
            });
    }

    dealWithSubmissionResult(apiPromise, transformedJSON, listKey) {
        apiPromise
            .then((result) => {
                console.log(result);
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
    }

    

    onModalClose = () => {
        this.setState({
            modalOpen: false,
        });
    }

    editPost = (key) => {
        // console.log(this.state.myPosts[key]);
        this.setState({
            modalType: "Edit",
            modalOpen: true,
            editPostInfo: {
                key: key,
                postInfo: this.state.myPosts[key],
            }
        });
    }

    addNewPost() {
        this.setState({
            modalType: "Add",
            modalOpen: true,
            editPostInfo: {
                postInfo: null,
                key: null,
            },
        });
    }

    getAllCurrentPosts() {
        console.warn("getAllCurrentPosts should be implemented in subclass")
    }

    deletePost(listKey) {
        console.warn("deletePost should be implemented in subclass")
    }

    onSubmit() {
        console.warn("onSubmit should be implemented in subclass")
    }

    getTitle() {
        console.warn("getTitle should be implemented in subclass")
    }

    render() {
        // console.log("rerender")
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.toolbar} />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <PostList
                        items={this.state.currPosts}
                        isMyPosts={false}
                        title="Latest Posts"
                        priceName={this.getModalSpecifics().serverPriceFieldName}
                    />
                    <PostList
                        items={this.state.myPosts}
                        isMyPosts={true}
                        title="My Posts"
                        editPost={this.editPost}
                        deletePost={this.deletePost}
                        priceName={this.getModalSpecifics().serverPriceFieldName}
                    />
                </Grid>
                <ListingModal
                    {...this.getModalSpecifics()}
                    open={this.state.modalOpen}
                    onClose={this.onModalClose}
                    type={this.state.modalType}
                    title={this.getTitle()}
                    closeModal={this.closeModal}
                    apiWrapper={this.props.apiWrapper}
                    onSubmit={this.onSubmit}
                    defaultValues={this.state.editPostInfo.postInfo}
                    listKey={this.state.editPostInfo.key}
                />
                <Box className={classes.addButton}>
                    <Fab
                        color="secondary"
                        aria-label="add"
                        onClick={() => this.addNewPost()}
                        className={classes.rightAlign}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
            </React.Fragment>
        );
    }
}

export default (Listings);