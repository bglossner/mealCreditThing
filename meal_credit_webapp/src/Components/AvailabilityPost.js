import React from "react";
import Post from "./Post";
import { withStyles, Typography, Grid, Box } from "@material-ui/core";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PersonIcon from '@material-ui/icons/Person';
import DateWrapper from "../API/date_wrapper";

const dateWrapper = new DateWrapper();
const styles = theme => ({
    card: {
        padding: "1% 5% 2%",
        textAlign: "center",
        width: "90%",
    },
    fullBox: {
        width: "100%",
        marginBottom: "3%",
    },
    horizBox: {
        display: "flex",
        alignItems: "center",
        justifyCcontent: "center",
        alignSelf: "center",
    },
    rightAlign: {
        marginLeft: "auto",
    },
    money: {
        color: "green",
    },
    nextToPic: {
        marginLeft: "2%",
    }
});

class AvailabilityPost extends Post {

    renderFields() {
        const { classes } = this.props;
        const timeLeft = dateWrapper.getTimeFromNow(this.props.endTime);
        const comp = Math.round(this.props.askingPrice);
        const priceListing = this.props.askingPrice === comp ? comp : this.props.askingPrice.toFixed(2);
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Box className={`${classes.horizBox} ${classes.fullBox}`}>
                    <Typography className={classes.titleClass} variant="h6">
                        { this.props.location }
                    </Typography>
                    <Typography className={`${classes.money} ${classes.rightAlign}`} variant="body1">
                        { `$${priceListing}` }
                    </Typography>
                </Box>
                <Box className={`${classes.horizBox} ${classes.fullBox}`}>
                    {
                        timeLeft ?
                            <React.Fragment>
                                <QueryBuilderIcon />
                                <Typography className={classes.nextToPic} variant="body2">
                                    { timeLeft }
                                </Typography>
                            </React.Fragment>
                        :
                            null
                    }
                    <Box className={`${classes.horizBox} ${classes.rightAlign}`}>
                        <PersonIcon />
                        <Typography className={classes.nextToPic} variant="body2">
                            { this.props.username }
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        );
    }
}

export default (withStyles(styles)(AvailabilityPost));