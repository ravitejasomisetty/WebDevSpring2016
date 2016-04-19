/**
 * Created by ravit on 3/23/2016.
 */
"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
module.exports = function (app, tellerModel) {

    var auth = authorized;
    passport.use('grabacarTeller', new LocalStrategy(grabacarLocalStrategy));
    passport.serializeUser(serializeUser);

    app.post("/api/grabacar/teller", newTeller);
    //app.get("/api/grabacar/teller", findTellerByCredentials);
    app.post("/api/grabacar/teller/login",passport.authenticate('grabacarTeller'), login);
    app.get("/api/grabacar/teller", findAllTellers);
    app.get("/api/grabacar/teller/:employeeid",auth, viewTeller);
    app.put("/api/grabacar/teller/:employeeid",auth,  updateTeller);
    app.delete("/api/grabacar/teller/:employeeid",auth, deleteTeller);
    app.get("/api/grabacar/tellersession/loggedin", loggedin);
    app.post("/api/grabacar/tellersession/logout", logout);

    function serializeUser(user, done) {
        done(null, user);
    }

    function grabacarLocalStrategy(username, password, done) {
        tellerModel
            .findTellerByTellerName(username)
            .then(
                function (user) {
                    if (user && password== user.password) {
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
    function login(req, res) {
        var user = req.user;
        req.session.user = user;
        res.json(user);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.session.user : null);
        // res.json(req.session.user);
    }

    function findTellerByCredentials(req, res) {
        if (req.query.username) {
            var credentials = {
                "username": req.query.username,
                "password": req.query.password
            };
            var user = tellerModel.findTellerByCredentials(credentials)
                .then(
                    function (doc) {
                        req.session.user = doc;
                        res.json(doc);
                    },
                    //send error if promise rejected
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }
        else {
            tellerModel.findAllTellers()
                .then(function (tellers) {
                        res.json(tellers);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        }
    }

    function newTeller(req, res) {
        var teller = req.body;

        tellerModel.newTeller(teller)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    res.json(teller);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllTellers(req, res) {
        tellerModel.findAllTellers()
            .then(function (tellers) {
                    res.json(tellers);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function viewTeller(req, res) {
        tellerModel.viewTeller(req.params.employeeid)
            .then(function (teller) {
                    res.json(teller);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateTeller(req, res) {
        var teller = req.body;
        tellerModel.updateTeller(req.params.employeeid, teller)
            .then(function (doc) {
                    res.json(teller);
                },// send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteTeller(req, res) {
        var employeeid = req.params.employeeid;
        tellerModel.deleteTeller(employeeid)
            .then(function (tellers) {
                    res.json(tellers);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};