import React, { Component } from "react";

import Input from "../Components/Input";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SmartCheckbox from "../Components/Checkbox";
import { connect } from "react-redux";

class Register extends Component {
    attemptRegistration() {
        return null;
    }

    render() {
        return (
            <div className="login-page">
                <div className="user-info-form">
                    {/* {this.props.pageError === null ||
                    this.props.pageError === undefined ? null : (
                        // <Error message={this.props.pageError.errorMsg} />
                    )} */}
                    {/* <Ribbon /> */}
                    <div id="info-form" className="register-form">
                        <React.Fragment>
                            <Input
                                name="username"
                                type="text"
                                placeholder="Username"
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                            <Input
                                name="email"
                                type="text"
                                placeholder="Email Address"
                            />
                            <Input
                                name="firstname"
                                type="text"
                                placeholder="First Name"
                            />
                            <Input
                                name="lastname"
                                type="text"
                                placeholder="Last Name"
                            />
                            <Input
                                name="phonenumber"
                                type="text"
                                placeholder="Phone Number"
                            />
                            <button onClick={() => this.attemptRegistration()}>
                                create
                            </button>
                            {/* eslint-disable-next-line */}
                            <p className="message">
                                Already registered?
                                <Link to="/login"> Sign in</Link>
                            </p>
                        </React.Fragment>
                    </div>
                    <SmartCheckbox
                        store={this.props.store}
                        message={"Remember Me"}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

Register.propTypes = {
    pageError: PropTypes.object,
    apiWrapper: PropTypes.object,
    cookieWrapper: PropTypes.object
};

export default connect(mapStateToProps, null)(Register);
