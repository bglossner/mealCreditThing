import React from "react";
import { List, ListItem, Grid, Typography, Box, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ListingModal from "../Components/ListingModal";

class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPosts: null,
            myPosts: null,
            modalType: null,
            modalOpen: false,
        };
        this.getAllCurrentPosts();
    }

    mapPosts(posts, classes) {
        if (posts !== null) {
            return posts.map((postInfo, step) => {
                return (
                    <ListItem className={classes.listItem} key={step} button>
                        { this.makePostType(postInfo) }
                    </ListItem>
                );
            });
        }

        return null;
    }

    onModalClose = () => {
        this.setState({
            modalOpen: false,
        });
    }

    /* closeModal = () => {
        let curModalInfo = Object.assign({}, this.state.modalInfo);
        curModalInfo.open = false;
        this.setState({
            modalInfo: curModalInfo,
        });
    } */

    addNewPost() {
        this.setState({
            modalType: "Add",
            modalOpen: true,
        });
    }

    getAllCurrentPosts() {
        console.warn("getAllCurrentPosts should be implemented in subclass")
    }

    makePostType(postInfo) {
        console.warn("makePost should be implemented in subclass")
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
        console.log(classes)
        return (
            <React.Fragment>
                <div className={classes.toolbar} />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <List
                        subheader={
                            <Typography className={classes.listHeader} variant="h4">
                                Latest Posts
                            </Typography>
                        }
                        className={classes.postList}
                    >
                        { this.mapPosts(this.state.currPosts, classes) }
                    </List>
                    <List
                        subheader={
                            <Box className={classes.listHeader}>
                                <Typography variant="h4">
                                    My Posts
                                </Typography>
                            </Box>
                        }
                        className={classes.postList}
                    >
                        { this.mapPosts(this.state.myPosts, classes) }
                    </List>
                </Grid>
                <ListingModal
                    open={this.state.modalOpen}
                    onClose={this.onModalClose}
                    type={this.state.modalType}
                    title={this.getTitle()}
                    closeModal={this.closeModal}
                    apiWrapper={this.props.apiWrapper}
                    onSubmit={this.onSubmit}
                />
                <Box className={classes.addButton}>
                    <Fab
                        color="primary"
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