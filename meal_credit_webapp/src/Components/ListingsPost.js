import React from "react";
import Post from "./Post";
import { withStyles, Typography, Grid, Box } from "@material-ui/core";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PersonIcon from '@material-ui/icons/Person';
import DateWrapper from "../API/date_wrapper";

const dateWrapper = new DateWrapper();
const styles = theme => ({
    card: {
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
        justifyContent: "center",
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
    },
    top: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "85%",
        height: "88%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    paper: {
        boxShadow: "none",
        padding: "1% 5%",
    },
    box: {
        width: "80%",
    },
    rightMargin: {
        marginRight: "40%",
    },
    red: {
        backgroundColor: "red",
        "&:hover": {
            backgroundColor: "rgba(128, 0, 0, 0.5)"
        }
    }
});

class ListingsPost extends Post {

    getTimeLeftField() {
        if (this.props.dateFiltered) {
            let dates = dateWrapper.getOverlappingRange(this.props.startTime, this.props.endTime, this.props.dateFilter1, this.props.dateFilter2);
            return `${dates[0]}  --  ${dates[1]}`;
        }
        let timeBeforeStart = dateWrapper.getTimeFromNow(this.props.startTime);
        if (timeBeforeStart !== null) {
            return `${timeBeforeStart} until start`;
        }
        let timeBeforeEnd = dateWrapper.getTimeFromNow(this.props.endTime);
        if (timeBeforeEnd !== null) {
            return `${timeBeforeEnd} until end`;
        }

        return `No longer available!`
    }

    renderFields() {
        const { classes } = this.props;
        // console.log(this.props);
        const timeLeft = this.getTimeLeftField();
        const comp = Math.round(this.props.price);
        const priceListing = this.props.price === comp ? comp : this.props.price.toFixed(2);
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

export default (withStyles(styles)(ListingsPost));