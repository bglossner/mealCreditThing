export default class RegisterAPIWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    makeRegisterRequest(username, firstname, lastname, email, password, phoneNumber) {
        if (password === null || password.length === 0) {
            return false;
        }
        // eslint-disable-next-line
        else if ((username == email) && (username === null || username.length === 0)) {
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
                        resolve(JSON.parse(this.response));
                    }
                    else if (this.status === 401) {
                        reject(JSON.parse(this.response));
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