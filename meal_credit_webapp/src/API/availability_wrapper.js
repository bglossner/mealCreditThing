export default class AvailabilityAPIWrapper {
    constructor(baseURL, getDefaultStatusResponseFunc) {
        this.baseURL = baseURL;
        this.getDefaultStatusResponse = getDefaultStatusResponseFunc;
    }

    getAllPosts() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.baseURL + "availability-list", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response).result);
                    } else {
                        reject({
                            status: this.status,
                            message:  this.response.result || "Could not connect to the server!"
                        });
                    }
                }
            };
            xhr.send();
        });
    }

    makeNewPost(json) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.baseURL + "create/availability/", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        reject(this.getDefaultStatusResponse(this.status, this.response));
                    }
                }
            };
            xhr.send(JSON.stringify(json));
        });
    }

    getUserPosts(userID) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.baseURL + `availability-list/${userID}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response).result);
                    } else {
                        reject({
                            status: this.status,
                            message:  JSON.parse(this.response).result || "Could not connect to the server!"
                        });
                    }
                }
            };
            xhr.send();
        });
    }
}