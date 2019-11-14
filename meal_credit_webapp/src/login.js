import React from 'react';
import './css/login.css';

function Input(props) {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            className="non-checkbox"
        />
    );
}

class RememberMeCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }

    handleClick() {
        this.setState({
            checked: !this.state.checked,
        });
    }

    render() {
        this.props.store.dispatch({
            type: 'CHECKBOX_CHANGED',
            isChecked: this.state.checked,
        });
        const className = "remember-me " + (this.state.checked ? "checked-remember-me" : "unchecked-remember-me");
        return (
            <React.Fragment>
                <div className="remember-me-div">
                    <input onClick={() => this.handleClick()} id="remember-me-checkbox" type="checkbox" className={className} name="remember-me-check" />
                    <label htmlFor="remember-me-checkbox"><span>Remember Me</span></label>
                </div>
            </React.Fragment>
        );
    }
}

class LoginForm extends React.Component {

    attemptLogin() {
        let formElements = document.querySelector("#info-form").getElementsByTagName("input");
        let formEntries = {};
        for (let ele of formElements) {
            formEntries[ele.name] = ele.value;
        }
        let returnVal = this.props.apiWrapper.makeLoginRequest(formEntries["username"], formEntries["password"]);
    
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
                alert("Success");
            }
        }).catch((reason) => {
            console.log(reason);
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

        return (
            <div className="login-page">
                <div className="user-info-form">
                    <div id="info-form" className={formClassName}>
                        {input_fields}
                    </div>
                    <RememberMeCheckbox store={this.props.store} />
                </div>
            </div>
        );
    }
}

export default GeneralFormContainer;