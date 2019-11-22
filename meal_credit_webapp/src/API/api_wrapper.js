import LoginAPIWrapper from "./login_wrapper";
import RegistrationAPIWrapper from "./registration_wrapper";

export default class APIWrapper {
    constructor() {
        // TODO: Make this an environment variable??
        this.baseURL = "http://localhost:8000/";
        this.loginWrapper = new LoginAPIWrapper(this.baseURL);
        this.registerWrapper = new RegistrationAPIWrapper(this.baseURL);
    }

    login(username, password) {
        if (
            username === null ||
            username.length === 0 ||
            password === null ||
            password.length === 0
        ) {
            return false;
        }

        const json = {
            password: password
        };
        if (this.checkIfEmail(username)) {
            json["email"] = username;
        } else {
            json["username"] = username;
        }
        //console.log(username + " | "  + password + password.length);

        return this.loginWrapper.makeLoginRequest(json);
    }

    register(firstname, lastname, username, password, email, phoneNumber) {
        const json = {
            username,
            firstname,
            lastname,
            email,
            password,
            phoneNumber
        };
        return this.registerWrapper.makeRegisterRequest(json);
    }

    checkIfEmail(username) {
        return new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(
            username
        );
    }
}
