import { List, ListItem, Typography, withStyles } from "@material-ui/core";

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
    }
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
                //console.log(step);
                return (
                    <ListItem className={classes.listItem} key={step} button>
                        {this.makePostType(postInfo, isMyPosts, step)}
                    </ListItem>
                );
            });
        } else if (posts !== null && posts.length === 0) {
            // console.log("HERE2")
            return (
                <ListItem key={-1} className={classes.listItem}>
                    <Typography className={classes.italicize} variant="h6">
                        Sorry, no current posts
                    </Typography>
                </ListItem>
            );
        }

        // console.log("HERE")
        return (
            <ListItem key={-1} className={classes.listItem}>
                {this.renderLoader()}
            </ListItem>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <List
                subheader={
                    <Typography className={classes.listHeader} variant="h4">
                        {this.props.title}
                    </Typography>
                }
                className={classes.postList}
            >
                {this.mapPosts(this.props.items, this.props.isMyPosts, classes)}
            </List>
        );
    }
}

export default withStyles(styles)(PostList);
