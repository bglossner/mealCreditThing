import React from "react";
import Navlink from "./Navlink";
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
            paddingBottom: "10px",
            borderBottom: `2px solid ${PRIMARY_COLOR}`,
        }
    },
    underline: {
        paddingBottom: "10px",
        borderBottom: `2px solid ${PRIMARY_COLOR}`,
    }
});

class TopNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: -1,
        };
    }

    handleClick = (i) => {
        this.setState({
            active: i,
        });
    }

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
                        { this.props.loginInfo ? `Welcome ${this.props.loginInfo.firstname}!` : `Not signed in` }
                    </Typography>
                    <Typography className={classes.centerText} variant="h4">
                        Meal Credit Sharing
                    </Typography>
                    <Toolbar className={classes.toolBar}>
                        <Navlink 
                            title="Availability Listings"
                            onClick={() => this.handleClick(0)}
                            to="/availability"
                            isActive={this.state.active === 0}
                            classes={classes}
                        />
                        <Navlink 
                            title="Hunger Listings"
                            onClick={() => this.handleClick(1)}
                            to="/home"
                            isActive={this.state.active === 1}
                            classes={classes}
                        />
                        <Navlink 
                            title="Messages"
                            onClick={() => this.handleClick(2)}
                            to="/home"
                            isActive={this.state.active === 2}
                            classes={classes}
                        />
                        <Navlink
                            title={<SettingsIcon />}
                            onClick={() => this.handleClick(3)}
                            to="/home"
                            isActive={this.state.active === 3}
                            classes={classes}
                        >

                        </Navlink>
                        <LogoutButton cookieWrapper={this.props.cookieWrapper} />
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