import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    /* Need this to set everything after UNDER AppBar */
    toolbar: theme.mixins.toolbar,
});
class Home extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div class={classes.toolbar} />
                <div>Home Page</div>
            </React.Fragment>
        );
    }
}

export default (withStyles(styles)(Home));
