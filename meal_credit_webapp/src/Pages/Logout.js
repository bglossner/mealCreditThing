import React from "react";
import { connect } from "react-redux";

class LogoutButton extends React.Component {
    handleClick() {
        this.props.cookieWrapper.deleteAllCookies();
        this.props.logout();
        console.log("Removed info");
    }

    render() {
        return <button onClick={() => this.handleClick()}>Logout</button>;
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
)(LogoutButton);
