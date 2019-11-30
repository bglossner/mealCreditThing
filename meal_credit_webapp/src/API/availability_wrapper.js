export default class AvailabilityAPIWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
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
                    } else if (this.status === 401) {
                        reject(JSON.parse(this.response));
                    } else {
                        reject({
                            status: 0,
                            message: "Could not connect to the server!"
                        });
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
                            message:  this.response.result || "Could not connect to the server!"
                        });
                    }
                }
            };
            xhr.send();
        });
    }
}