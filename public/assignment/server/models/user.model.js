"use strict";
module.exports = function (app) {
    var users = require("user.mock.json");
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    }

    return api;

    var Create = function (user,callback) {
        users.push(user);
        return users;
    }

    var FindAll = function () {
        return users;
    }

    var FindById = function (id) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id)
                return users[i];
        }
        return null;
    }

    var Update = function (id, user) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].username = user.username;
                users[i].password = user.password;
            }
        }
    }

    var Delete = function (id) {
        var usersCopy = users;
        for (var i = 0; i < usersCopy.length; i++) {
            if (usersCopy[i]._id == userId) {
                users.splice(i, 1);
            }
        }
    }

    var findUserByUsername = function (username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username)
                return users[i];
        }
        return null;
    }

    var findUserByCredentials = function (credentials) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password)
                return users[i];
        }
        return null;
    }
};