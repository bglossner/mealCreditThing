import React from "react";
import { List, ListItem, Grid, Typography, Box } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ListingModal from "../Components/ListingModal";

class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPosts: null,
            locations: null,
            myPosts: null,
            modalInfo: {
                open: false,
                type: "Add",
                innerInfo: this.getDefaultModalInfo()
            },
        };
        this.setupPage();
    }

    getDefaultModalInfo() {
        return {
            startTime: null,
            endTime: null,
            askingPrice: 0,
            location: null,
        };
    }

    getCurrentModalInfo(field) {
        return this.state.modalInfo.innerInfo ? this.state.modalInfo.innerInfo[field] : null;
    }

    setCurrentModalInfo(field, value) {
        let curState = Object.assign({}, this.state.modalInfo);
        if (this.state.modalInfo.innerInfo) {
            curState.modalInfo.innerInfo[field] = value;
            this.setState({
                modalInfo: curState,
            });
        }
    }

    handleStartTimeChange = (dateTime) => {
        this.setCurrentModalInfo("startTime", dateTime);
    }

    handleEndTimeChange = (dateTime) => {
        this.setCurrentModalInfo("endTime", dateTime);
    }

    setupPage() {
        this.getAllCurrentPosts();
        this.getAllLocations();
    }

    getAllLocations() {
        let retVal = this.props.apiWrapper.getAllLocations();
        retVal
            .then(locations => {
                this.setState({
                    locations: locations,
                });
            })
            .catch(reason => {
                console.log(reason)
            });
    }

    onModalClose = () => {
        this.setState({
            modalInfo: {
                open: false,
                type: "Add",
                innerInfo: this.getDefaultModalInfo()
            },
        });
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

    getAllCurrentPosts() {
        console.warn("getAllCurrentPosts should be implemented in subclass")
    }

    makePostType(postInfo) {
        console.warn("makePost should be implemented in subclass")
    }

    addNewPost() {
        console.warn("addNewPost should be implemented in subclass")
    }

    renderInnerModal() {
        console.warn("renderInnerModal should be implemented in subclass")
    }

    getTitle() {
        console.warn("getTitle should be implemented in subclass")
    }

    render() {
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
                                <AddCircleOutlineOutlinedIcon 
                                    fontSize="large"
                                    className={classes.clickableIcon}
                                    onClick={() => this.addNewPost()}
                                />
                            </Box>
                        }
                        className={classes.postList}
                    >
                        { this.mapPosts(this.state.myPosts, classes) }
                    </List>
                </Grid>
                <ListingModal
                    open={this.state.modalInfo.open}
                    onClose={this.onModalClose}
                    title={this.getTitle()}
                >
                    { this.renderInnerModal() }
                </ListingModal>
            </React.Fragment>
        );
    }
}

export default (Listings);