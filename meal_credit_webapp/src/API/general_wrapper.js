export default class GeneralAPIWrapper {
    constructor(baseURL, getDefaultStatusResponseFunc) {
        this.baseURL = baseURL;
        this.getDefaultStatusResponse = getDefaultStatusResponseFunc;
    }

    getAllLocations() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var getDefaultStatusResponse = this.getDefaultStatusResponse;
            xhr.open("GET", this.baseURL + "locations", true);
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