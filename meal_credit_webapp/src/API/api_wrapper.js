import LoginAPIWrapper from "./login_wrapper";
import RegistrationAPIWrapper from "./registration_wrapper";
import AvailabilityAPIWrapper from "./availability_wrapper";
import HungerAPIWrapper from "./hunger_wrapper";
import GeneralAPIWrapper from "./general_wrapper";

export default class APIWrapper {
    constructor(store) {
        // TODO: Make this an environment variable??
        this.baseURL = "http://localhost:8000/";
        this.loginWrapper = new LoginAPIWrapper(this.baseURL);
        this.registerWrapper = new RegistrationAPIWrapper(this.baseURL);
        this.availabilityWrapper = new AvailabilityAPIWrapper(this.baseURL, this.getDefaultStatusResponse);
        this.hungerWrapper = new HungerAPIWrapper(this.baseURL, this.getDefaultStatusResponse);
        this.generalWrapper = new GeneralAPIWrapper(this.baseURL);
        this.store = store;
    }

    getUserInformation() {
        return this.store.getState().userLoginInfo;
    }

    getDefaultStatusResponse = (status, error) => {
        let errorMessage;
        switch (status) {
            case 401: {
                errorMessage = "Invalid user information. Are you logged in? Consider relogging.";
                break
            },
            case 403: {
                errorMessage = "You cannot change/delete this post!";
                break
            }
            case 500: {
                errorMessage = "Server error!";
                break
            }
            case 0: {
                errorMessage = "Could not connect to the server!"
                break
            }
            default: {
                errorMessage = "Unknown error occurred!"
                break
            }
        }

        return {
            status: status,
            message: errorMessage,
        }
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

    combineLoginInfoForRequest(json) {
        let currLoginInfo = this.getUserInformation();
        return Object.assign({
            user_id: currLoginInfo.user_id,
            token: currLoginInfo.token
        }, json);
    }

    getAllLocations() {
        return this.generalWrapper.getAllLocations();
    }

    getTransformedJSON(jsonPostInfo) {
        let currLoginInfo = this.getUserInformation();
        if (jsonPostInfo.startTime === null) {
            jsonPostInfo.startTime = new Date();
        }
        return {
            asking_price: Number(jsonPostInfo.askingPrice),
            location: jsonPostInfo.location,
            end_time: jsonPostInfo.endTime.toISOString(),
            start_time: jsonPostInfo.startTime.toISOString(),
            user_id: currLoginInfo.user_id,
            token: currLoginInfo.token
        }
    }

    getAvailabilityPosts() {
        return this.availabilityWrapper.getAllPosts();
    }

    makeAvailabilityPost(jsonPostInfo) {
        return this.availabilityWrapper.makeNewPost(jsonPostInfo);
    }

    editAvailabilityPost(jsonPostInfo) {
        return this.availabilityWrapper.editPost(jsonPostInfo);
    }

    getFilteredAvailabilityPosts(jsonFilter) {

    }

    getMyAvailabilityPosts(myID) {
        return this.availabilityWrapper.getUserPosts(myID);
    }

    deleteAvailabilityPost(avId) {
        return this.availabilityWrapper.deletePost(this.combineLoginInfoForRequest({ av_id: avId }));
    }

    getHungerPosts() {
        return this.hungerWrapper.getAllPosts();
    }

    makeHungerPost(jsonPostInfo) {
        return this.hungerWrapper.makeNewPost(jsonPostInfo);
    }

    editHungerPost(jsonPostInfo) {
        return this.hungerWrapper.editPost(jsonPostInfo);
    }

    getFilteredHungerPosts(jsonFilter) {

    }

    getMyHungerPosts(myID) {
        return this.hungerWrapper.getUserPosts(myID);
    }

    deleteHungerPost(hgId) {
        return this.hungerWrapper.deletePost(this.combineLoginInfoForRequest({ hg_id: hgId }));
    }
}
