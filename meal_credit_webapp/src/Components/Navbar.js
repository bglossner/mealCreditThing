import React from "react";
import { Link } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutButton from '../Pages/Logout'
import { withStyles, AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { PRIMARY_COLOR } from "../Constants";
import { connect } from "react-redux";

const styles = theme => ({
    appBar: {
        backgroundColor: "white",
        paddingLeft: "2.5%",
    },
    sideText: {
        fontStyle: "italic",
        marginRight: "5%",
    },
    centerText: {
        textAlign: "center",
        margin: "auto",
        color: PRIMARY_COLOR,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    toolBar: {
        justifyContent: "flex-end",
        '&:last-child': {
            marginLeft: "auto"
        }
    },
    link: {
        marginRight: theme.spacing(5),
        color: PRIMARY_COLOR,
        textTransform: "uppercase",
        '&:hover': {
            textDecoration: "none",
            color: PRIMARY_COLOR,
        }
    }
});

class TopNavbar extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar} position="fixed">
                <Grid 
                    container
                    justify="flex-end"
                    alignItems="center"
                >
                    <Typography className={classes.sideText} variant="body1">
                        { this.props.loginInfo ? `Welcome ${this.props.loginInfo.firstname} ${this.props.loginInfo.lastname}` : `Not signed in` }
                    </Typography>
                    <Typography className={classes.centerText} variant="h4">
                        Meal Credit Sharing
                    </Typography>
                    <Toolbar className={classes.toolBar}>
                        <Link className={classes.link} to="/">
                            Availability Listings
                        </Link>
                        <Link className={classes.link} to="/">
                            Hunger Listings
                        </Link>
                        <Link className={classes.link} to="/">
                            Messages
                        </Link>
                        <Link className={classes.link} to="/">
                            <SettingsIcon />
                        </Link>
                        <LogoutButton />
                    </Toolbar>
                </Grid>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.userLoginInfo
    };
};

export default connect(
    mapStateToProps,
    null   
)(withStyles(styles)(TopNavbar));