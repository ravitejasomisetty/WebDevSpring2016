"use strict";
module.exports = function (app, model) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    var createUser = function (req, res) {
        var users = model.Create(req.body);
        res.send(users);
    }

    var findAllUsers = function (req, res) {
        var users = model.FindAll(req.body);
        res.send(users);
    }

    var findUserById = function (req, res) {
        var user = model.FindById(req.params.id);
        res.send(user);
    }

    var findUserByUsername = function (req, res) {
        var user = model.findUserByUsername(req.query.username);
        res.send(user);
    }

    var findUserByCredentials = function (req, res) {
        var credentials = {
            "username": req.query.username,
            "password": req.query.password
        };
        var user = model.findUserByCredentials(credentials);
        res.send(user);
    }

    var updateUser = function (req, res) {
        model.Update(req.params.id, req.body);
    }

    var deleteUser = function (req, res) {
        model.Delete(req.parmas.id);
    }
};
