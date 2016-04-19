/**
 * Created by ravit on 3/22/2016.
 */
"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
module.exports = function (app, renterModel) {

    var auth = authorized;
    passport.use('grabacar', new LocalStrategy(grabacarLocalStrategy));
    passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    app.get("/api/grabacar/renter/isYoungDriver/:id", isYoungDriver);
    app.post("/api/grabacar/renter", createRenter);
    app.post("/api/grabacar/renter/login", passport.authenticate('grabacar'), login);
    app.get("/api/grabacar/renters",auth,  findAllRenters);
    app.get("/api/grabacar/renter/:id",  findRenterById);
    app.get("/api/grabacar/renterByFirstName/:firstName",auth,  findRentersByFirstName);
    app.get("/api/grabacar/renter?rentername=rentername", findRenterByRentername);
    app.put("/api/grabacar/renter/:id", updateRenter);
    app.delete("/api/grabacar/renter/:id",  deleteRenter);
    app.get("/api/grabacar/rentersession/loggedin", loggedin);
    app.post("/api/grabacar/rentersession/logout", logout);
    app.get("/api/grabacar/rentersession/refresh", refreshSession);

    function login(req, res) {
        var user = req.user;
        req.session.user = user;
        res.json(user);
    }

    function grabacarLocalStrategy(username, password, done) {
        renterModel
            .findRenterByRentername(username)
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

    function findRentersByFirstName(req, res) {
        var firstName = req.params.firstName;
        renterModel.findRentersByFirstName(firstName)
            .then(
                function (renters) {
                    res.json(renters);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function refreshSession(req, res) {
        var currentUser = req.session.user;
        renterModel.FindById(currentUser._id)
            .then(
                function (renter) {
                    req.session.user = renter;
                    res.json(req.session.user);
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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.rentername == "r") {
            console.log("deserialize");
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
        }}

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        console.log(req.isAuthenticated());

        res.json(req.isAuthenticated() ? req.session.user : null);
    }

    function isYoungDriver(req, res) {
        var renterId = req.params.id;
        var msg = renterModel.isYoungDriver(renterId);
        res.send(msg);
    }

    function createRenter(req, res) {
        var newRenter = req.body;
        newRenter.rentername=newRenter.username;
        newRenter.password = bcrypt.hashSync(newRenter.password);
        renterModel
            .findRenterByRentername(newRenter.rentername)
            .then(
                function (renter) {
                    if (renter) {
                        res.json(null);
                    } else {
                        return renterModel.Create(newRenter);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (renter) {
                    if (renter) {
                        req.login(renter, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                req.session.user = renter;
                                res.json(renter);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllRenters(req, res) {
        renterModel.FindAll()
            .then(function (renters) {
                    res.json(renters);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findRenterById(req, res) {
        renterModel.FindById(req.params.id)
            .then(function (renter) {
                    res.json(renter);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findRenterByRentername(req, res) {
        renterModel.findRenterByRentername(req.query.rentername)
            .then(
                function (renter) {
                    res.json(renter);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findRenterByCredentials(req, res) {
        var rentername = req.query.username;
        var password = req.query.password;
        if (req.query.username) {
            renterModel.findRenterByCredentials({rentername: rentername, password: password})
                .then(
                    function (doc) {
                        req.session.user = doc;
                        res.json(doc);
                    }, function (err) {
                        res.status(400).send(err);
                    })
        }
        else {
            renterModel.FindAll()
                .then(function (renters) {
                        res.json(renters);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        }

    }

    function updateRenter(req, res) {
        var id = req.params.id;
        var renter = req.body;
        renter.password=bcrypt.hashSync(renter.password);
        var renters = renterModel.Update(id, renter)
            .then(function (doc) {
                    res.json(renter);
                },// send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteRenter(req, res) {
        renterModel.Delete(req.params.id)
            .then(function (renters) {
                    res.json(renters);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};
