/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (app, rentModel) {
    app.post("/api/grabacar/rent", rentVehicle);
    app.get("/api/grabacar/rent", findAllRents);
    app.get("/api/grabacar/rent/json/:recent", recentRent);
    app.get("/api/grabacar/rent/:rentid", viewRent);
    app.put("/api/grabacar/rent/:rentid", updateRent);
    app.delete("/api/grabacar/rent/:rentid", deleteRent);
    app.get("/api/grabacar/teller/:employeeid/rentsApproved", findAllRentsByTeller);
    app.get("/api/grabacar/renter/:renterid/rents", findAllRentsByRenter);
    app.put("/api/grabacar/rent/:rentid/employeeid/:employeeid/approve", approveRent);
    app.put("/api/grabacar/rent/:rentid/cancel", cancelRent);

    function cancelRent(req, res) {
        var rentid = req.params.rentid;
        rentModel.cancelRent(rentid)
            .then(function (cancelledRent) {
                    res.json(cancelledRent);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }

    function recentRent(req, res) {
        var recent = req.params.recent;
        var recentRentJSON = null;
        if (recent == "true") {
            recentRentJSON = rentModel.recentRent();
        }
        res.json(recentRentJSON);
    }

    function approveRent(req, res) {
        var rentid = req.params.rentid;
        var employeeid = req.params.employeeid;
        var msg = rentModel.approveRent(rentid, employeeid);
        res.send(msg);
    }

    function findAllRentsByTeller(req, res) {
        var employeeid = req.params.employeeid;
        rentModel.findAllRentsByTeller(employeeid)
            .then(function (rents) {
                res.json(rents);
            }, function (err) {
                res.status(400).send(err);
            })
    }

    function findAllRentsByRenter(req, res) {
        var renterid = req.params.renterid;
        rentModel.findAllRentsByRenter(renterid)
            .then(function (rents) {
                res.json(rents);
            }, function (err) {
                res.status(400).send(err);
            })
    }

    function rentVehicle(req, res) {
        var rent = req.body;
        rentModel.rentVehicle(rent)
            .then(function (rents) {
                    res.json(rents);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAllRents(req, res) {
        rentModel.findAllRents()
            .then(function (rents) {
                    res.json(rents);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function viewRent(req, res) {
        rentModel.viewRent(req.params.rentid)
            .then(function (rent) {
                    res.json(rent);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateRent(req, res) {
        var rent = req.body;
        rentModel.updateRent(rent)
            .then(function (doc) {
                    res.json(doc);
                },// send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteRent(req, res) {
        var rentid = req.params.rentid;
        rentModel.deleteRent(rentid)
            .then(function (msg) {
                    res.json(msg);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

};