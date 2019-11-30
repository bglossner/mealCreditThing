export default class GeneralAPIWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getAllLocations() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.baseURL + "locations", true);
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