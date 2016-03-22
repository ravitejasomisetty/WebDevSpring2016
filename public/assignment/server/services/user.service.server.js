"use strict";
module.exports = function (app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var newUser=req.body;
        newUser._id=null;
        var users = userModel.Create(newUser);
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
        var user = userModel.findUserByUsername(req.query.username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        if(req.query.username) {
            var credentials = {
                "username": req.query.username,
                "password": req.query.password
            };
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        }
        else
        {
            var users = userModel.FindAll();
            res.json(users);
        }
    }

    function updateUser(req, res) {
        var users=userModel.Update(req.params.id, req.body);
        res.json(users);
    }

    function deleteUser(req, res) {
        var users=userModel.Delete(req.params.id);
        res.json(users);
    }
};
