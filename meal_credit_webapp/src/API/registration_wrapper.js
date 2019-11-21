export default class RegisterAPIWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    makeRegisterRequest(json) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.baseURL + "register/", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response));
                    } else if (this.status === 401) {
                        reject(JSON.parse(this.response));
                    }
                }
            };
            xhr.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send(JSON.stringify(json));
        });
    }
}
