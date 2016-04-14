/**
 * Created by ravit on 3/23/2016.
 */
"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, tellerModel) {

    var auth = authorized;

    app.post("/api/grabacar/teller", newTeller);
    app.get("/api/grabacar/teller", passport.authenticate('teller'), findTellerByCredentials);
    app.get("/api/grabacar/teller", findAllTellers);
    app.get("/api/grabacar/teller/:employeeid", viewTeller);
    app.put("/api/grabacar/teller/:employeeid", auth, updateTeller);
    app.delete("/api/grabacar/teller/:employeeid", auth, deleteTeller);


    // passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    passport.use('teller', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function localStrategy(username, password, done) {

        tellerModel.findTellerByCredentials({username: username, password: password})
            .then(
                function (doc) {

                    if (!doc) {
                        return done(null, false);
                    }

                    return done(null, doc);
                },
                // send error if promise rejected
                function (err) {

                    return done(err);
                }
            );
    }));

    function serializeUser(user, done) {
        console.log("ser")
        console.log(user)
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("des")
        console.log(user)
        tellerModel
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
        res.json(req.isAuthenticated() ? req.session.user : null);
        // res.json(req.session.user);
    }

    function findTellerByCredentials(req, res) {
        // if (req.query.username) {
        //     var credentials = {
        //         "username": req.query.username,
        //         "password": req.query.password
        //     };
        //     var user = tellerModel.findTellerByCredentials(credentials)
        //         .then(
        //             function (doc) {
        //                 req.session.user = doc;
        //                 res.json(doc);
        //             },
        //             // send error if promise rejected
        //             function (err) {
        //                 res.status(400).send(err);
        //             }
        //         )
        // }
        var teller = req.body;
        if (teller.username) {
            req.session.user = renter;
            res.json(renter);
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