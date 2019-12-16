export default class PostsAPIWrapper {
    constructor(baseURL, getDefaultStatusResponseFunc) {
        this.baseURL = baseURL;
        this.getDefaultStatusResponse = getDefaultStatusResponseFunc;
        // console.log(typeof(this.getDefaultStatusResponse), typeof(getDefaultStatusResponseFunc));
        // console.log(this.getDefaultStatusResponse(401))
    }

    /* getTransformedJSON(jsonPostInfo) {
        console.warn("getTransformedJSON should be implemented in subclass");
    } */

    getAllPosts() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.baseURL + `${this.postType}-list`, true);
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
            var getDefaultStatusResponse = this.getDefaultStatusResponse;
            xhr.open("POST", this.baseURL + `create/${this.postType}/`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        reject(getDefaultStatusResponse(this.status, this.response));
                    }
                }
            };
            xhr.send(JSON.stringify(json));
        });
    }

    editPost(json) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var getDefaultStatusResponse = this.getDefaultStatusResponse;
            xhr.open("PUT", this.baseURL + `change/${this.postType}/`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        reject(getDefaultStatusResponse(this.status, this.response));
                    }
                }
            };
            xhr.send(JSON.stringify(json));
        });
    }

    deletePost(json) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var getDefaultStatusResponse = this.getDefaultStatusResponse;
            xhr.open("DELETE", this.baseURL + `delete/${this.postType}/`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        reject(getDefaultStatusResponse(this.status, this.response));
                    }
                }
            };
            xhr.send(JSON.stringify(json));
        });
    }

    getUserPosts(userID) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.baseURL + `${this.postType}-list/${userID}`, true);
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