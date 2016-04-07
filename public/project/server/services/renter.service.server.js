/**
 * Created by ravit on 3/22/2016.
 */
"use strict";
module.exports = function (app, renterModel) {
    app.get("/api/grabacar/renter/isYoungDriver/:id",isYoungDriver);
    app.post("/api/grabacar/renter", createRenter);
    app.get("/api/grabacar/renter", findRenterByCredentials);
    app.get("/api/grabacar/renter", findAllRenters);
    app.get("/api/grabacar/renter/:id", findRenterById);
    app.get("/api/grabacar/renter?rentername=rentername", findRenterByRentername);
    app.put("/api/grabacar/renter/:id", updateRenter);
    app.delete("/api/grabacar/renter/:id", deleteRenter);
    app.get("/api/grabacar/rentersession/loggedin", loggedin);
    app.post("/api/grabacar/rentersession/logout", logout);

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.session.user);
    }

    function isYoungDriver(req,res){
        var renterId=req.params.id;
        var msg=renterModel.isYoungDriver(renterId);
        res.send(msg);
    }

    function createRenter(req, res) {
        var newRenter=req.body;
        newRenter = renterModel.Create(newRenter)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    req.session.user = doc;
                    res.json(newRenter);
                },
                // send error if promise rejected
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
        if (req.query.rentername) {
            var credentials = {
                "rentername": req.query.rentername,
                "password": req.query.password
            };
            var user = renterModel.findRenterByCredentials(credentials)
                .then(
                    function (doc) {
                        req.session.user = doc;
                        res.json(doc);
                    },
                    // send error if promise rejected
                    function (err) {
                        res.status(400).send(err);
                    }
                )
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
