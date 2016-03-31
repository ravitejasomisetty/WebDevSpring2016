"use strict";
module.exports = function (app, userModel) {
    app.get("/api/assignment/user/loggedin", loggedin);
    app.post("/api/assignment/user/logout", logout);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;

        user = userModel.Create(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        userModel.FindAll()
            .then(function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                });

    }

    function findUserById(req, res) {
        userModel.FindById(req.params.id)
            .then(function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByUsername(req, res) {
        userModel.findUserByCredentials(req.query.username)
            .then(
                function (user) {
                    res.json(user);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findUserByCredentials(req, res) {
        if (req.query.username) {
            var credentials = {
                "username": req.query.username,
                "password": req.query.password
            };
            var user = userModel.findUserByCredentials(credentials)
                .then(
                    function (doc) {
                        req.session.currentUser = doc;
                        res.json(doc);
                    },
                    // send error if promise rejected
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }
        else {
            var users = userModel.FindAll();
            res.json(users);
        }
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        var users = userModel.Update(id, user)
            .then(function (doc) {
                    res.json(user);
                },// send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteUser(req, res) {
        userModel.Delete(req.params.id)
            .then(function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};
