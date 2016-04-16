/**
 * Created by ravit on 3/23/2016.
 */
"use strict";
module.exports = function (app, tellerModel) {

    app.post("/api/grabacar/teller", newTeller);
    app.get("/api/grabacar/teller", findTellerByCredentials);
    app.get("/api/grabacar/teller", findAllTellers);
    app.get("/api/grabacar/teller/:employeeid", viewTeller);
    app.put("/api/grabacar/teller/:employeeid",  updateTeller);
    app.delete("/api/grabacar/teller/:employeeid", deleteTeller);
    app.get("/api/grabacar/tellersession/loggedin", loggedin);
    app.post("/api/grabacar/tellersession/logout", logout);
    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        //res.json(req.isAuthenticated() ? req.session.user : null);
         res.json(req.session.user);
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