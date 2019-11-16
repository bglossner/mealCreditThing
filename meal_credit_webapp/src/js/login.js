import React from 'react';
import '../css/login.css';
import '../css/user_error.css'
import Input from './Input';
import RememberMeCheckbox from './Checkbox'
import { connect } from 'react-redux';

function RibbonInfo(props) {
    let label = props.label === null ? "" : props.label;
    delete props["label"];
    return (
        <div className="ribbon" style={props}>{label}</div>
    );
}

function UserError(props) {
    return (
        <div className="user-error">
            <p className="error-msg">{props.errorMessage}</p>
        </div>
    );
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorRibbons: null,
        };
    }

    handleLoginErrors(error) {
        let jsonError = {};
        jsonError.status = error.status;
        jsonError.errorMsg = error.message;
        this.props.store.dispatch({
            type: 'USER_ERROR',
            userError: jsonError,
        });
    }

    attemptLogin() {
        let formElements = document.querySelector("#info-form").getElementsByTagName("input");
        let formEntries = {};
        for (let ele of formElements) {
            formEntries[ele.name] = ele.value;
        }
        let returnVal = this.props.apiWrapper.login(formEntries["username"], formEntries["password"]);
    
        returnVal.then((result) => {
            if (result === false) {
                console.log("Username/password empty");
            }
            else {
                console.log(result);
                if (this.props.store.getState().rememberMeChecked) {
                    console.log("Storing cookies");
                    this.props.storeLoginInfo(result);
                }
                this.props.store.dispatch({
                    type: 'USER_ERROR',
                    userError: null,
                });
                alert("Success");
            }
        }).catch((reason) => {
            console.log(reason);
            this.handleLoginErrors(reason);
        });
    }

    render() {
        return (
            <React.Fragment>
                <Input name="username" type="text" placeholder="Username/Email" />
                <Input name="password" type="password" placeholder="Password" />
                <button onClick={() => this.attemptLogin()}>login</button>
                {/* eslint-disable-next-line */}
                <p className="message">Not registered? <a onClick={() => this.props.switchForms()}>Create an account</a></p>
            </React.Fragment>
        );
    }
}

class RegisterForm extends React.Component {
    
    attemptRegistration() {
        return null;
    }

    render() {
        return (
            <React.Fragment>
                <Input name="username" type="text" placeholder="Username"/>
                <Input name="password" type="password" placeholder="Password"/>
                <Input name="email" type="text" placeholder="Email Address"/>
                <Input name="firstname" type="text" placeholder="First Name"/>
                <Input name="lastname" type="text" placeholder="Last Name"/>
                <Input name="phonenumber" type="text" placeholder="Phone Number"/>
                <button onClick={() => this.attemptRegistration()}>create</button>
                {/* eslint-disable-next-line */}
                <p className="message">Already registered? <a onClick={() => this.props.switchForms()}>Sign in</a></p>
            </React.Fragment>
        );
    }
}

class GeneralFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginForm: true,
        };
        this.switchForms = this.switchForms.bind(this);
        this.storeLoginInfo = this.storeLoginInfo.bind(this);
    }

    storeLoginInfo(apiResult) {
        delete apiResult["message"];
        //console.log(apiResult);
        //console.log(typeof(apiResult));
        this.props.cookieWrapper.storeCookie("user_information", JSON.stringify(apiResult), 5000);
        this.props.store.dispatch({
            type: 'CHANGE_LOGIN_INFO',
            loginInfo: apiResult,
        });
        /* for (let key in apiResult) {
            storeCookie(key, apiResult[key], 5000);
        } */
    }

    switchForms() {
        this.setState({
            isLoginForm: !this.state.isLoginForm,
        });
    }

    render() {
        let formClassName, input_fields;
        if (this.state.isLoginForm) {
            formClassName = "login-form";
            input_fields = <LoginForm storeLoginInfo={this.storeLoginInfo} store={this.props.store} apiWrapper={this.props.api} switchForms={this.switchForms} />;
        }
        else {
            formClassName = "register-form";
            input_fields = <RegisterForm  storeLoginInfo={this.storeLoginInfo} store={this.props.store} apiWrapper={this.props.api} switchForms={this.switchForms} />;
        }
        //console.log("Rerendering: " + this.state.pageError);
        //console.log(this.props.store.getState().userError);

        return (
            <div className="login-page">
                <div className="user-info-form">
                    { this.props.pageError === null || this.props.pageError === undefined ? (null) : <UserError errorMessage={this.props.pageError.errorMsg} /> }
                    <RibbonInfo position="absolute" background="red" top="50px" right="-9.8vw" width="10vw"  />
                    <div id="info-form" className={formClassName}>
                        {input_fields}
                    </div>
                    <RememberMeCheckbox store={this.props.store} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        pageError: state.userError,
    }
}

export default connect(
    mapStateToProps,
    null
)(GeneralFormContainer);