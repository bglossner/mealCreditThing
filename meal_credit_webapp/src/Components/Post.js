import React from "react";
import { withStyles, Card, Typography } from "@material-ui/core";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        };
    }

    renderFields() {
        console.warn("renderFields should be implemented by subclass!")
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card} raised={this.props.raised}>
                { this.renderFields() }
            </Card>
        );
    }
}

export default (Post);