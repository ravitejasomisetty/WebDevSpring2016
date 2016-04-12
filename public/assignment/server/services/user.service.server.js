"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, userModel) {

    var auth = authorized;

    app.get("/api/assignment/user/loggedin", loggedin);
    app.post("/api/assignment/user/logout", logout);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", passport.authenticate('local'), findUserByCredentials);
    app.get("/api/assignment/users", auth, findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function isAdmin(user) {
        if (user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }


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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
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

    function loggedin(req, res) {
        // res.json(req.session.currentUser);
        res.send(req.isAuthenticated() ? req.session.currentUser : '0');
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        if (!user.roles) {
            user.roles = ['student'];
        }
        userModel.findUserByUsername(user.username)
            .then(function (foundUser) {
                    if (!foundUser) {
                        user = userModel.Create(user)
                            // handle model promise
                            .then(
                                // login user if promise resolved
                                function (doc) {
                                    res.json(doc);
                                    // var credentials = {
                                    //         "username": doc.username,
                                    //         "password": doc.password
                                    //     };
                                    // userModel.findUserByCredentials(credentials)
                                    //     .then(function (u) {
                                    //         req.session.currentUser = u;
                                    //         res.json(u);
                                    //     },function (err) {
                                    //         res.status(400).send(err);
                                    //     });
                                },
                                // send error if promise rejected
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                    }
                    else {
                        //User exists
                        res.status(400).send(err);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });

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
        console.log(req.user)
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
            console.log("in else")
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
