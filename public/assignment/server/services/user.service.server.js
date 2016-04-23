"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
module.exports = function (app, userModel, renterModel, tellerModel) {

    var auth = authorized;

    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get("/api/assignment/user/loggedin", loggedin);
    app.post("/api/assignment/user/logout", logout);
    app.post("/api/assignment/user", createUser);
    app.post("/api/assignment/user/add", auth, addUser);
    app.post("/api/assignment/user/login", passport.authenticate('assignment'), login);
    app.get("/api/assignment/users", auth, findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);

    function assignmentLocalStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(user) {
        if (user.roles.indexOf("admin") > 0) {
            return true;
        }
        return false;
    }

    /*


     function localStrategy(username, password, done) {
     userModel
     .findUserByCredentials({username: username, password: password})
     .then(
     function (user) {
     if (!user) {
     return done(null, false);
     }
     return done(null, user);
     },
     function (err) {
     if (err) {
     return done(err);
     }
     }
     );
     }
     */

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.type == "assignment") {
            userModel
                .FindById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
        else if (user.rentername) {
            renterModel
                .FindById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
        else if (user.username) {
            tellerModel
                .viewTeller(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }

    function loggedin(req, res) {
        // res.json(req.session.currentUser);
        res.send(req.isAuthenticated() ? req.session.currentUser : null);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        req.session.currentUser = user;
        res.json(user);
    }

    function addUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        return userModel.Create(newUser)
                            .then(
                                // fetch all the users
                                function () {
                                    return userModel.FindAll();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.FindAll();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            )
    }

    function createUser(req, res) {
        var newUser = req.body;
        if (!newUser.roles) {
            newUser.roles = ['student'];
            newUser.type = "assignment";
            newUser.password = bcrypt.hashSync(newUser.password);
        }
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {

                    if (user) {
                        res.json(null);
                    } else {

                        return userModel.Create(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                req.session.currentUser = user;
                                res.json(user);
                            }
                        });
                    }
                },
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
        if (req.user) {
            req.session.currentUser = req.user;
            res.json(req.user);
            // var credentials = {
            //     "username": req.query.username,
            //     "password": req.query.password
            // };
            // var user = userModel.findUserByCredentials(credentials)
            //     .then(
            //         function (doc) {
            //             req.session.currentUser = doc;
            //             res.json(doc);
            //         },
            //         // send error if promise rejected
            //         function (err) {
            //             res.status(400).send(err);
            //         }
            //     )
        }
        else {
            userModel.FindAll()
                .then(function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        }
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        if (user.password != req.session.currentUser.password)
            user.password = bcrypt.hashSync(user.password);
        var users = userModel.Update(id, user)
            .then(function (doc) {
                    req.session.currentUser = doc;
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
