module.exports = class APIWrapper {
    constructor() {
        this.baseURL = "http://localhost:8000/"
    }

    checkIfEmail(username) {
        return (new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)).test(username);
    }

    makeRegisterRequest() {
        
    }

    makeLoginRequest(username, password) {
        //console.log(username + " | "  + password + password.length);
        if (username === null || username.length === 0 || password === null || password.length === 0) {
            return false;
        }

        let json = {
            password: password,
        };
        if (this.checkIfEmail(username)) {
            json["email"] = username;
        }
        else {
            json["username"] = username;
        }
        //console.log(username + " | "  + password);

        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.baseURL + "login/", true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function () { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(this.response);
                    }
                    else if (this.status === 401) {
                        reject(this.response);
                    }
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send(JSON.stringify(json));
        });
    }
}