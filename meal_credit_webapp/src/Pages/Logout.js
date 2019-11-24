import React from "react";
import { connect } from "react-redux";
import { withStyles, Button } from "@material-ui/core";

const styles = theme => ({
    root: {
        backgroundColor: "red",
    }
});

class LogoutButton extends React.Component {
    handleClick() {
        this.props.cookieWrapper.deleteAllCookies();
        this.props.logout();
        console.log("Removed info");
    }

    render() {
        return <Button onClick={() => this.handleClick()}>Logout</Button>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () =>
            dispatch({
                type: "CHANGE_LOGIN_INFO",
                loginInfo: null
            })
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(LogoutButton));
