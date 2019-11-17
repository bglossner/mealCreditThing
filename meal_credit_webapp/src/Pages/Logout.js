import React from "react";
import "../css/logout.css";

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: false,
        };
    }

    handleClick() {
        this.props.cookieWrapper.deleteAllCookies();
        this.props.store.dispatch({
            type: "CHANGE_LOGIN_INFO",
            loginInfo: null
        });
        console.log("Removed info");
        this.setState({ temp: true, })
    }

    render() {
        return <button onClick={() => this.handleClick()}>Logout</button>;
    }
}

export default LogoutButton;
