/**
 * Created by ravit on 3/22/2016.
 */
"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, renterModel) {

    var auth = authorized;

    app.get("/api/grabacar/renter/isYoungDriver/:id", isYoungDriver);
    app.post("/api/grabacar/renter", createRenter);
    app.get("/api/grabacar/renter", passport.authenticate('renter'), findRenterByCredentials);
    app.get("/api/grabacar/renters", findAllRenters);
    app.get("/api/grabacar/renter/:id", findRenterById);
    app.get("/api/grabacar/renter?rentername=rentername", findRenterByRentername);
    app.put("/api/grabacar/renter/:id", auth, updateRenter);
    app.delete("/api/grabacar/renter/:id", auth, deleteRenter);
    app.get("/api/grabacar/rentersession/loggedin", loggedin);
    app.post("/api/grabacar/rentersession/logout", logout);

    // passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    passport.use('renter', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, function localStrategy(username, password, done) {
            renterModel.findRenterByCredentials({rentername: username, password: password})
                .then(
                    function (doc) {

                        if (!doc) {
                            return done(null, false);
                        } else {

                            return done(null, doc);
                        }
                    },
                    // send error if promise rejected
                    function (err) {

                        return done(err);
                    }
                );
        }
    ));

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
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

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        // res.json(req.isAuthenticated() ? req.session.user : null);
        res.json(req.session.user);
    }

    function isYoungDriver(req, res) {
        var renterId = req.params.id;
        var msg = renterModel.isYoungDriver(renterId);
        res.send(msg);
    }

    function createRenter(req, res) {
        var newRenter = req.body;
        renterModel.findRenterByRentername(newRenter.rentername)
            .then(
                function (foundRenter) {
                    if (!foundRenter) {
                        newRenter = renterModel.Create(newRenter)
                            // handle model promise
                            .then(
                                // login user if promise resolved
                                function (doc) {
                                    // req.session.user = doc;
                                    res.json(newRenter);
                                },
                                // send error if promise rejected
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        res.status(400).send(err);
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
        var renter = req.user;
        if (renter.rentername) {

            req.session.user = renter;
            res.json(renter);
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
        var renters = renterModel.Update(id, renter)
            .then(function (doc) {
                    req.session.user = doc;
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
