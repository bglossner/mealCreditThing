import React from "react";
import { withStyles, ListItem } from "@material-ui/core";
import ListingsPost from "./ListingsPost";

const styles = theme => ({
    listItem: {
        display: "flex",
        justifyContent: "center",
    },
});

class PostListItem extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef(null);
    }

    makePostType(postInfo, isMyPosts, listKey) {
        return (
            <ListingsPost
                username={postInfo.username}
                userId={postInfo.user_id}
                location={postInfo.location}
                askingPrice={postInfo.asking_price}
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

    /* componentDidMount() {
        this.props.addRef(this.myRef);
    } */

    scrollHere = () => window.scrollTo(0, this.myRef.current.offsetTop);

    render() {
        const { classes } = this.props;
        console.log("props", this.props.listKey);
        return (
            <ListItem
                key={this.props.listKey}
                // ref={this.myRef}
                // className={classes.listItem}
                onClick={() => { console.log(this.props.listKey);} }
                button
            >
                { this.makePostType(this.props.postInfo, this.props.isMyPosts, this.props.listKey) }
            </ListItem>
        );
    }
}

export default withStyles(styles)(PostListItem);