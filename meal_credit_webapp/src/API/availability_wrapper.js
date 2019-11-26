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
                        console.log(this.response)
                        resolve(JSON.parse(this.response).result);
                    } else {
                        reject({
                            status: 0,
                            message: "Could not connect to the server!"
                        });
                    }
                }
            };
            xhr.send();
        });
    }
}