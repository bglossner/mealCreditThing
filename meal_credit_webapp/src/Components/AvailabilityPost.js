import React from "react";
import Post from "./Post";
import { withStyles, Typography, Grid, Box } from "@material-ui/core";
import DateWrapper from "../API/date_wrapper";

const dateWrapper = new DateWrapper();
const styles = theme => ({
    card: {
        padding: "1% 2%",
        textAlign: "center"
    },
    titleClass: {
        marginRight: "0%",
    },
    horizBox: {
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    rightAlign: {
        marginLeft: "auto",
    }
});

class AvailabilityPost extends Post {

    renderFields() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Box className={classes.horizBox}>
                    <Typography className={classes.titleClass} variant="h6">
                        { this.props.location }
                    </Typography>
                    <Typography className={classes.rightAlign} variant="body2">
                        { "$" + this.props.askingPrice }
                    </Typography>
                </Box>
                <Typography variant="body2">
                    { dateWrapper.getTimeFromNow(this.props.endDate) }
                </Typography>
                <Typography variant="body2">
                    { "Posted by: " + (this.props.fullname ? this.props.fullname : this.props.username) }
                </Typography>
            </Grid>
        );
    }
}

export default (withStyles(styles)(AvailabilityPost));