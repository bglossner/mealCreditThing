import React from 'react';
import './login.css';

function Input(props) {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
        />
    );
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    storeLoginInfo(apiResult) {
        delete apiResult["message"];
        console.log(apiResult);
        for (let key in apiResult) {
            storeCookie(key, apiResult[key], 5000);
        }
    }

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
                this.storeLoginInfo(result);
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
                <p className="message">Not registered? <a onClick={() => this.props.switchForms()}>Create an account</a></p>
            </React.Fragment>
        );
    }
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
    }
    
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
    }

    switchForms() {
        this.setState({
            isLoginForm: !this.state.isLoginForm,
        });
    }

    render() {
        let userInfo = retrieveCookieIfExists("user-logged-in");
        if (userInfo !== null) {
            alert("LOGGING IN")
        }

        let formClassName, input_fields;
        if (this.state.isLoginForm) {
            formClassName = "login-form";
            input_fields = <LoginForm apiWrapper={this.props.api} switchForms={this.switchForms} />;
        }
        else {
            formClassName = "register-form";
            input_fields = <RegisterForm apiWrapper={this.props.api} switchForms={this.switchForms} />;
        }

        return (
            <div className="login-page">
                <div className="user-info-form">
                    <div id="info-form" className={formClassName}>
                        {input_fields}
                    </div>
                    <input type="checkbox" name="remember-me" className="remember-me" /><p className="right-align">Remember Me</p>
                </div>
            </div>
        );
    }
}

function retrieveCookieIfExists(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

function storeCookie(cname, data, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + data + ";" + expires + ";path=/";
}

export default GeneralFormContainer;