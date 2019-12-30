import { List, ListItem, Typography, Box, withStyles } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import CachedIcon from '@material-ui/icons/Cached';
import ListingsPost from "./ListingsPost";
import React from "react";
import ReactLoading from "react-loading";

const styles = theme => ({
    postList: {
        backgroundColor: theme.palette.primary.secondary,
        width: "30%",
        marginTop: "1%"
    },
    listHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    listItem: {
        display: "flex",
        justifyContent: "center"
    },
    italicize: {
        fontStyle: "italic"
    },
    icon: {
        cursor: "pointer",
        transform: "scale(1.5)",
    },
    filterIcon: {
        marginLeft: "7%",
    },
    resetIcon: {
        marginLeft: "10%",
    },
    active: {
        paddingBottom: "5px",
        borderBottom: `2px solid black`,
        transform: "scale(2)"
    },
});

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.postRefs = [];
    }

    addToPostRefs = ref => {
        this.postRefs.push(ref);
    };

    moveDownTo = postNum => {
        console.log("Post num:", postNum);
        console.log(this.postRef);
        this.postRefs[postNum].scrollHere();
    };

    makePostType(postInfo, isMyPosts, listKey) {
        return (
            <ListingsPost
                username={postInfo.username}
                userId={postInfo.user_id}
                location={postInfo.location}
                price={postInfo[this.props.priceName]}
                startTime={postInfo.start_time}
                endTime={postInfo.end_time}
                allowEdits={isMyPosts}
                listKey={listKey}
                editPost={this.props.editPost}
                deletePost={this.props.deletePost}
                moveDownTo={this.props.moveDownTo}
            />
        );
    }

    /*
    <PostListItem
        postInfo={postInfo}
        isMyPosts={isMyPosts}
        editPost={this.props.editPost}
        deletePost={this.props.deletePost}
        addRef={this.addToPostRefs}
        moveDownTo={this.moveDownTo}
        listKey={step + (isMyPosts ? 100 : 0)}
    />
    */

    renderLoader() {
        return <ReactLoading type="spinningBubbles" color="#000" />;
    }

    mapPosts(posts, isMyPosts, classes) {
        // console.log("Posts", posts)
        if (posts !== null && posts.length > 0) {
            return posts.map((postInfo, step) => {
                return (
                    <ListItem className={classes.listItem} key={step} button>
                        {this.makePostType(postInfo, isMyPosts, step)}
                    </ListItem>
                );
            });
        } else if (posts !== null && posts.length === 0) {
            return (
                <ListItem key={-1} className={classes.listItem}>
                    <Typography className={classes.italicize} variant="h6">
                        Sorry, no current posts
                    </Typography>
                </ListItem>
            );
        }

        return (
            <ListItem key={-1} className={classes.listItem}>
                {this.renderLoader()}
            </ListItem>
        );
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.filterActive);
        return (
            <List
                subheader={
                    <Box className={classes.listHeader}>
                        <Typography className={classes.listHeader} variant="h4">
                            {this.props.title}
                        </Typography>
                        <CachedIcon
                            className={`${classes.resetIcon} ${classes.icon}`}
                            onClick={this.props.onResetClick}
                        />
                        <FilterListIcon
                            className={`${classes.filterIcon} ${classes.icon} ${this.props.filterActive ? classes.active : '' }`}
                            onClick={this.props.onFilterClick}
                        />
                    </Box>
                }
                className={classes.postList}
            >
                {this.mapPosts(this.props.items, this.props.isMyPosts, classes)}
            </List>
        );
    }
}

export default withStyles(styles)(PostList);
