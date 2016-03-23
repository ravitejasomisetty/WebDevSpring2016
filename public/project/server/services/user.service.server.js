/**
 * Created by ravit on 3/22/2016.
 */
"use strict";
module.exports = function (app, userModel) {
    app.get("/api/grabacar/user/isYoungDriver/:id",isYoungDriver);
    app.post("/api/grabacar/user", createUser);
    app.get("/api/grabacar/user", findUserByCredentials);
    app.get("/api/grabacar/user", findAllUsers);
    app.get("/api/grabacar/user/:id", findUserById);
    app.get("/api/grabacar/user?username=username", findUserByUsername);
    app.put("/api/grabacar/user/:id", updateUser);
    app.delete("/api/grabacar/user/:id", deleteUser);

    function isYoungDriver(req,res){
        var userId=req.params.id;
        var msg=userModel.isYoungDriver(userId);
        res.send(msg);
    }

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
