const mysql = require("mysql");
const bcrypt = require("bcrypt");
const dateParser = require("./dateParsing");
require("dotenv").config();
const saltRounds = 10;
const defaultTimeOff = 18;
var timeOff = process.env.TIME_OFFSET;
if (timeOff == undefined || timeOff == null) {
    timeOff = defaultTimeOff;
}
console.log("Timeoff: " + timeOff);

module.exports = class DataAccess {
    // Host, user, password, database
    constructor(connectionOptions) {
        this._connection = mysql.createConnection(connectionOptions);
    }

    async getAvailabilityList(
        size,
        where,
        who,
        startTime,
        endTime,
        price,
        sort
    ) {
        let users = [];
        let myQuery = `SELECT a.*, u.username FROM Availability AS a INNER JOIN Users AS u ON a.user_id = u.user_id`;

        if (who != "") {
            myQuery = `SELECT a.*, u.username FROM Availability a INNER JOIN Users u ON a.user_id = u.user_id WHERE u.username LIKE '%${who}%'`;
        }

        if (where != "") {
            let locationStrs = "(";
            for (let i = 0; i < where.length; i++) {
                locationStrs += `location = '${where[i].toLowerCase()}' OR `
            }
            locationStrs += `location = 'anywhere')`;
            // console.log(locationStrs);
            if (who != "") {
                myQuery += ` AND ${locationStrs}`;
            } else {
                myQuery += ` WHERE ${locationStrs}`;
            }
        }

        if (startTime || endTime) {
            if (who || where) {
                if (startTime) {
                    myQuery += ` AND end_time >= '${startTime}'`;
                }
                if (endTime) {
                    myQuery += ` AND start_time <= '${endTime}'`;
                }
            } else {
                if (startTime) {
                    myQuery += ` WHERE end_time >= '${endTime}'`;
                }
                if (endTime && !startTime) {
                    myQuery += ` WHERE start_time <= '${startTime}'`;
                } else if (endTime) {
                    myQuery += ` AND start_time <= '${endTime}'`;
                }
            }
        }

        if (price && price >= 0) {
            if (who || where || startTime || endTime) {
                myQuery += ` AND asking_price <= ${price}`;
            } else {
                myQuery += ` WHERE asking_price <= ${price}`;
            }
        }

        if (sort) {
            myQuery += ` ORDER BY ${sort} ASC`;
        }

        if (size != -1) {
            myQuery += ` LIMIT ${size}`;
        }

        // console.log(myQuery);

        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    for (let element of result) {
                        let userRet = {
                            av_id: element.av_id,
                            user_id: element.user_id,
                            username: element.username,
                            asking_price: element.asking_price,
                            location: element.location,
                            start_time: element.start_time,
                            end_time: element.end_time
                        };
                        //console.log(userRet.start_time);
                        userRet.start_time = dateParser.getHourOffset(
                            userRet.start_time,
                            timeOff
                        );
                        userRet.end_time = dateParser.getHourOffset(
                            userRet.end_time,
                            timeOff
                        );
                        users.push(userRet);
                    }
                    resolve(users);
                }
            })
        );

        return users;
    }

    async getAvailabilityListUser(userId) {
        let users = [];
        let myQuery = `SELECT a.*, u.username FROM Availability AS a INNER JOIN Users AS u ON a.user_id = u.user_id WHERE u.user_id = ${userId} ORDER BY start_time`;

        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    for (let element of result) {
                        let userRet = {
                            av_id: element.av_id,
                            user_id: element.user_id,
                            username: element.username,
                            asking_price: element.asking_price,
                            location: element.location,
                            start_time: element.start_time,
                            end_time: element.end_time
                        };
                        //console.log(element.start_time);
                        userRet.start_time = dateParser.getHourOffset(
                            userRet.start_time,
                            timeOff
                        );
                        userRet.end_time = dateParser.getHourOffset(
                            userRet.end_time,
                            timeOff
                        );
                        //console.log(userRet.start_time);
                        users.push(userRet);
                    }
                    resolve(users);
                }
            })
        );

        return users;
    }

    async getAllLocations() {
        let locations = [];
        let myQuery =
            "SELECT DISTINCT location FROM (SELECT location FROM Availability UNION SELECT location FROM Hunger) t;";

        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    for (let element of result) {
                        locations.push(element.location);
                    }
                    resolve(locations);
                }
            })
        );

        return locations;
    }

    async getHungerListUser(userId) {
        let users = [];
        let myQuery = `SELECT * FROM Hunger WHERE user_id = ${userId}`;

        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    for (let element of result) {
                        let userRet = {
                            hg_id: element.hg_id,
                            user_id: element.user_id,
                            asking_price: element.asking_price,
                            location: element.location,
                            start_time: element.start_time,
                            end_time: element.end_time
                        };
                        userRet.start_time = dateParser.getHourOffset(
                            userRet.start_time,
                            timeOff
                        );
                        userRet.end_time = dateParser.getHourOffset(
                            userRet.end_time,
                            timeOff
                        );
                        users.push(userRet);
                    }
                    resolve(users);
                }
            })
        );

        return users;
    }

    async getUsersFromIDs(start, limit) {
        let users = [];
        let myQuery = ``;

        if (limit == -1) {
            myQuery = `SELECT * FROM Users WHERE user_id > ${start - 1}`;
        } else {
            myQuery = `SELECT * FROM Users WHERE user_id > ${start -
                1} LIMIT ${limit}`;
        }
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    for (let element of result) {
                        let userRet = {
                            user_id: element.user_id,
                            username: element.username
                        };
                        users.push(userRet);
                    }
                    resolve(users);
                }
            })
        );

        return users;
    }

    async getHungerList(size, where, who, startTime, endTime, price, sort) {
        let users = [];
        let myQuery = `SELECT a.*, u.username FROM Hunger AS a INNER JOIN Users AS u ON a.user_id = u.user_id`;

        if (who != "") {
            myQuery = `SELECT a.*, u.username FROM Hunger a INNER JOIN Users u ON a.user_id = u.user_id WHERE u.username LIKE '%${who}%'`;
        }

        if (where != "") {
            let locationStrs = "(";
            for (let i = 0; i < where.length; i++) {
                locationStrs += `location = '${where[i].toLowerCase()}' OR `
            }
            locationStrs += `location = 'anywhere')`;
            // console.log(locationStrs);
            if (who != "") {
                myQuery += ` AND ${locationStrs}`;
            } else {
                myQuery += ` WHERE ${locationStrs}`;
            }
        }

        if (startTime || endTime) {
            if (who || where) {
                if (startTime) {
                    myQuery += ` AND end_time >= '${startTime}'`;
                }
                if (endTime) {
                    myQuery += ` AND start_time <= '${endTime}'`;
                }
            } else {
                if (startTime) {
                    myQuery += ` WHERE end_time >= '${endTime}'`;
                }
                if (endTime && !startTime) {
                    myQuery += ` WHERE start_time <= '${startTime}'`;
                } else if (endTime) {
                    myQuery += ` AND start_time <= '${endTime}'`;
                }
            }
        }

        if (price && price >= 0) {
            if (who || where || startTime || endTime) {
                myQuery += ` AND max_price >= ${price}`;
            } else {
                myQuery += ` WHERE max_price >= ${price}`;
            }
        }

        if (sort) {
            myQuery += ` ORDER BY ${sort} ASC`;
        }

        if (size != -1) {
            myQuery += ` LIMIT ${size}`;
        }

        //console.log(myQuery);

        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    for (let element of result) {
                        let userRet = {
                            hg_id: element.hg_id,
                            user_id: element.user_id,
                            username: element.username,
                            max_price: element.max_price,
                            location: element.location,
                            start_time: element.start_time,
                            end_time: element.end_time
                        };
                        //console.log(userRet.start_time);
                        userRet.start_time = dateParser.getHourOffset(
                            userRet.start_time,
                            timeOff
                        );
                        userRet.end_time = dateParser.getHourOffset(
                            userRet.end_time,
                            timeOff
                        );
                        users.push(userRet);
                    }
                    resolve(users);
                }
            })
        );

        return users;
    }

    async getUserFromEmail(email) {
        let myQuery = `Select * from Users where email = '${email}'`;
        let users;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    users = result;
                }
                resolve(result);
            })
        );
        return users;
    }

    async postUserObject(
        firstname,
        lastname,
        username,
        password,
        phonenumber = null,
        email = null
    ) {
        let myQuery = "";
        let salt = this.makeSalt(10);
        let user_id = null;
        await bcrypt
            .hash(password + salt, saltRounds)
            .then(async password_hash => {
                myQuery = `INSERT INTO Users VALUES (DEFAULT, '${firstname}', '${lastname}', '${username}', '${password_hash}','${salt}',`;
                myQuery += phonenumber !== null ? `'${phonenumber}',` : "NULL,";
                myQuery += email !== null ? `'${email}')` : "NULL)";
                await new Promise((resolve, reject) =>
                    this._connection.query(myQuery, (err, result, fields) => {
                        if (err) {
                            reject(err);
                        } else {
                            user_id = result.insertId;
                            if (user_id == 0 && result.affectedRows == 0) {
                                user_id = null;
                            }
                        }
                        resolve(result);
                    })
                );
            });

        return user_id;
    }

    async changePassword(user_id, password) {
        let salt = this.makeSalt(10);
        await bcrypt
            .hash(password + salt, saltRounds)
            .then(async password_hash => {
                let myQuery = `UPDATE Users SET password_hash = '${password_hash}', salt = '${salt}' WHERE user_id = '${user_id}';`;
                await new Promise((resolve, reject) =>
                    this._connection.query(myQuery, (err, result, fields) => {
                        if (err) {
                            reject(err);
                        } else {
                            user_id = result.insertId;
                            if (user_id == 0 && result.affectedRows == 0) {
                                user_id = null;
                            }
                        }
                        resolve(result);
                    })
                );
            });
    }

    async postAvailabilityObject(
        user_id,
        asking_price,
        location,
        start_time,
        end_time
    ) {
        let myQuery = `INSERT INTO Availability VALUES (DEFAULT, ${user_id}, ${asking_price}, '${location}', '${start_time}', '${end_time}')`;
        console.log(myQuery);
        let retObj;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    retObj = {
                        retResult: result.affectedRows > 0,
                        add_info: result.insertId
                    };
                }
                resolve(result);
            })
        );

        return retObj;
    }

    async postHungerObject(user_id, max_price, location, start_time, end_time) {
        let myQuery = `INSERT INTO Hunger VALUES (DEFAULT, ${user_id}, ${max_price}, '${location}', '${start_time}', '${end_time}')`;
        let retResult;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    retResult = result.affectedRows > 0;
                }
                resolve(result);
            })
        );

        return retResult;
    }

    // Password helper functions

    makeSalt(length) {
        var text = "";
        var possible =
            "*.-/|{}!@#$%^&():;<>?[]ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        return text;
    }

    // Checks if the username and password are correct
    async checkUser(username, email, password) {
        let myQuery;
        if (username !== undefined && username.length > 0) {
            myQuery = `SELECT * FROM Users WHERE username = '${username}'`;
        } else if (email !== undefined && email.length > 0) {
            myQuery = `SELECT * FROM Users WHERE email = '${email}'`;
        } else {
            return false;
        }

        let returnUser = {};
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        let password_hash = result[0].password_hash;
                        let salt = result[0].salt;
                        if (
                            bcrypt.compareSync(password + salt, password_hash)
                        ) {
                            returnUser["id"] = result[0].user_id;
                            returnUser["matched"] = true;
                            returnUser["username"] = result[0].username;
                            returnUser["firstname"] = result[0].firstname;
                            returnUser["lastname"] = result[0].lastname;
                            returnUser["email"] = result[0].email;
                        }
                    }
                    resolve(returnUser);
                }
            })
        );

        return returnUser;
    }

    async isUniqueUsername(username) {
        let myQuery = `Select * from Users where username = '${username}'`;
        let unique = true;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else if (result.length > 0) {
                    unique = false;
                }
                resolve(unique);
            })
        );

        return unique;
    }

    async isUniqueEmail(email) {
        let myQuery = `Select * from Users where email = '${email}'`;
        let unique = true;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else if (result.length > 0) {
                    unique = false;
                }
                resolve(unique);
            })
        );

        return unique;
    }

    async getUserInfo(tableName, primaryKeyName, primaryKeyNum) {
        let myQuery = `SELECT user_id FROM ${tableName} WHERE ${primaryKeyName} = ${primaryKeyNum}`;
        let retResult;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    retResult = result.length > 0 ? result[0].user_id : -1;
                }
                resolve(result);
            })
        );
        return retResult;
    }

    async changeTable(table_name, editObject, id, id_name) {
        let myQuery = `UPDATE ${table_name} SET `;
        for (let key in editObject) {
            if (editObject[key]) {
                // console.log(key, editObject[key]);
                myQuery += `${key} = '${editObject[key]}', `;
            }
        }
        myQuery = myQuery.substring(0, myQuery.length - 2) + ` WHERE ${id_name} = ${id};`;
        // console.log(myQuery);
        let retResult;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    retResult = result.affectedRows > 0;
                }
                resolve(result);
            })
        );
        return retResult;
    }

    async deleteAvailabilityObject(av_id) {
        let myQuery = `DELETE FROM Availability WHERE av_id = ${av_id}`;
        let retResult;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    retResult = result.affectedRows > 0;
                }
                resolve(result);
            })
        );

        return retResult;
    }

    async deleteHungerObject(hg_id) {
        let myQuery = `DELETE FROM Hunger WHERE hg_id = ${hg_id}`;
        let retResult;
        await new Promise((resolve, reject) =>
            this._connection.query(myQuery, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    retResult = result.affectedRows > 0;
                }
                resolve(result);
            })
        );

        return retResult;
    }

    deleteOldObjects(start, end) {
        let myQuery1 = `DELETE FROM Availability WHERE start_time < '${start}' AND end_time < '${end}'`;
        let myQuery2 = `DELETE FROM Hunger WHERE start_time < '${start}' AND end_time < '${end}'`;
        this._connection.query(myQuery1);
        this._connection.query(myQuery2);
    }

    endConnection() {
        this._connection.end();
    }
};