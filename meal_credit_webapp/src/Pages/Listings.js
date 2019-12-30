import React from "react";
import {Grid, Box, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ListingModal from "../Components/ListingModal";
import PostList from "../Components/PostList";
import FilterPane from "../Components/FilterPane";

class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPosts: null,
            myPosts: null,
            unfilteredCurrPosts: null,
            unfilteredMyPosts: null,
            modalType: null,
            modalOpen: false,
            editPostInfo: {
                postInfo: null,
                key: null,
            },
            filterActive: false,
            filterType: 0,
            locations: null,
        };
        this.getAllCurrentPosts();
        this.getAllLocations();
    }

    setPosts(apiPromise, whichToSet = -1) {
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

                if (whichToSet === 0) {
                    this.setState({
                        currPosts: otherPosts,
                    });
                } else if (whichToSet === 1) {
                    this.setState({
                        myPosts: myPosts,
                    });
                } else {
                    this.setState({
                        currPosts: otherPosts,
                        myPosts: myPosts,
                        unfilteredCurrPosts: otherPosts,
                        unfilteredMyPosts: myPosts,
                    });
                }
            })
            .catch(reason => {
                console.log("ERROR", reason)
                this.setState({
                    currPosts: [],
                    myPosts: [],
                });
            });
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

    filter = (jsonFilterInfo) => {
        if ("sortBy" in jsonFilterInfo) {
            if (jsonFilterInfo["sortBy"] === "price") {
                jsonFilterInfo["sortBy"] = this.getPriceSpecifics().serverPriceFieldName;
            } else if (jsonFilterInfo["sortBy"] === "date") {
                jsonFilterInfo["sortBy"] = "end_time";
            }
        }

        if (this.state.filterType === 1) {
            jsonFilterInfo["username"] = this.props.loginInfo.username;
        }

        let apiPromise = this.onFilter(jsonFilterInfo);
        this.setPosts(apiPromise, this.state.filterType);
    }

    onFilterClick = (which) => {
        this.setState({
            filterActive: true,
            filterType: which,
        });
    }

    closeFilter = () => {
        this.setState({
            filterActive: false,
        });
    }

    resetList = (which) => {
        if (which === 0) {
            this.setState({
                currPosts: this.state.unfilteredCurrPosts,
            });
        } else {
            this.setState({
                myPosts: this.state.unfilteredMyPosts,
            });
        }
    }

    getAllCurrentPosts() {
        console.warn("getAllCurrentPosts should be implemented in subclass")
    }

    deletePost(listKey) {
        console.warn("deletePost should be implemented in subclass")
    }

    onFilter() {
        console.warn("onFilter should be implemented in subclass")
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
                        onFilterClick={() => this.onFilterClick(0)}
                        onResetClick={() => this.resetList(0)}
                        priceName={this.getPriceSpecifics().serverPriceFieldName}
                    />
                    { this.state.filterActive ?
                            <Box className={classes.filterBox}>
                                <FilterPane
                                    locations={this.state.locations}
                                    filter={this.filter}
                                    onClose={() => this.closeFilter()}
                                    which={this.state.filterType}
                                    {...this.getPriceSpecifics()}
                                />
                            </Box>
                        : 
                            null
                    }
                    <PostList
                        items={this.state.myPosts}
                        isMyPosts={true}
                        title="My Posts"
                        onFilterClick={() => this.onFilterClick(1)}
                        onResetClick={() => this.resetList(1)}
                        editPost={this.editPost}
                        deletePost={this.deletePost}
                        priceName={this.getPriceSpecifics().serverPriceFieldName}
                    />
                </Grid>
                <ListingModal
                    {...this.getPriceSpecifics()}
                    open={this.state.modalOpen}
                    onClose={this.onModalClose}
                    type={this.state.modalType}
                    title={this.getTitle()}
                    closeModal={this.closeModal}
                    apiWrapper={this.props.apiWrapper}
                    onSubmit={this.onSubmit}
                    defaultValues={this.state.editPostInfo.postInfo}
                    listKey={this.state.editPostInfo.key}
                    locations={this.state.locations}
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