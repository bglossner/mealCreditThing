import React from "react";
import "../css/logout.css";

class LogoutButton extends React.Component {
    handleClick() {
        this.props.cookieWrapper.deleteAllCookies();
        this.props.store.dispatch({
            type: "CHANGE_LOGIN_INFO",
            loginInfo: null
        });
    }

    render() {
        return <button onClick={() => this.handleClick()}>Logout</button>;
    }
}

export default LogoutButton;
