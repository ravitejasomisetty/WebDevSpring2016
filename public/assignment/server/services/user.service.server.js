"use strict";
module.exports = function (app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", function (req, res) {
            var credentials = {
                "username": req.query.username,
                "password": req.query.password
            };
        console.log(credentials.username);
        console.log(userModel);
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        }
    );
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var users = userModel.Create(req.body)
        res.json(users);
    }

    function findAllUsers(req, res) {
        var users = userModel.FindAll();
        res.json(users);
    }

    function findUserById(req, res) {
        var user = userModel.FindById(req.params.id);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        console.log("in find");
        var user = userModel.findUserByUsername(req.query.username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            "username": req.query.username,
            "password": req.query.password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUser(req, res) {
        userModel.Update(req.params.id, req.body);
    }

    function deleteUser(req, res) {
        userModel.Delete(req.parmas.id);
    }
};
