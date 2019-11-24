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

    register(firstname, lastname, username, password, email) {
        const json = {
            username,
            firstname,
            lastname,
            email,
            password
        };
        return this.registerWrapper.makeRegisterRequest(json);
    }

    /**
     *
     * @param {*} address The variable to validate.
     * Rules for valid Email: https://help.returnpath.com/hc/en-us/articles/220560587-What-are-the-rules-for-email-address-syntax-
     */
    checkIfEmail(address) {
        if (!address) return false;

        if (address.length > 254) return false;

        if (
            !new RegExp(
                /^\w+([!#$%&'*+-/=?^_`{|]?\w)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            ).test(address)
        )
            return false;

        const parts = address.split("@");
        if (parts[0].length > 64) return false;

        const domainParts = parts[1].split(".");
        if (
            domainParts.some(function(part) {
                return part.length > 63;
            })
        )
            return false;

        return true;
    }
}
