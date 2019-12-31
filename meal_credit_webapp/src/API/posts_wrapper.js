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
            var getDefaultStatusResponse = this.getDefaultStatusResponse;
            xhr.open("GET", this.baseURL + `${this.postType}-list`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response).result);
                    } else {
                        reject(getDefaultStatusResponse(this.status, this.response));
                    }
                }
            };
            xhr.send();
        });
    }

    getFilteredPosts(filterJSON) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var getDefaultStatusResponse = this.getDefaultStatusResponse;
            if (filterJSON["location"]) {
                filterJSON["location"] = filterJSON["location"].join("+");
            }
            const fullURL = this.baseURL + `${this.postType}-list/` +
                `${filterJSON["size"] || "-1"}/` +
                `${filterJSON["location"] || "false"}/` +
                `${filterJSON["username"] || "false"}/` +
                `${filterJSON["startTime"] || "false"}/` +
                `${filterJSON["endTime"] || "false"}/` +
                `${this.postType === "hunger" ? (filterJSON["maxPrice"] || "false") : (filterJSON["askingPrice"] || "false")}/` +
                `${filterJSON["sortBy"] || "false"}`
            ;
            xhr.open("GET", fullURL, true);
            console.log(fullURL);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response).result);
                    } else {
                        reject(getDefaultStatusResponse(this.status, this.response));
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
            var getDefaultStatusResponse = this.getDefaultStatusResponse;
            xhr.open("GET", this.baseURL + `${this.postType}-list/${userID}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response).result);
                    } else {
                        reject(getDefaultStatusResponse(this.status, this.response));
                    }
                }
            };
            xhr.send();
        });
    }
}