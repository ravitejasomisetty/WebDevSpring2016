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

    function isYoungDriver(req,res){
        var renterId=req.params.id;
        var msg=renterModel.isYoungDriver(renterId);
        res.send(msg);
    }

    function createRenter(req, res) {
        var newRenter=req.body;
        newRenter._id=null;
        var renters = renterModel.Create(newRenter);
        res.json(renters);
    }

    function findAllRenters(req, res) {
        var renters = renterModel.FindAll();
        res.json(renters);
    }

    function findRenterById(req, res) {
        var renter = renterModel.FindById(req.params.id);
        res.json(renter);
    }

    function findRenterByRentername(req, res) {
        var renter = renterModel.findRenterByRentername(req.query.rentername);
        res.json(renter);
    }

    function findRenterByCredentials(req, res) {
        if(req.query.rentername) {
            var credentials = {
                "rentername": req.query.rentername,
                "password": req.query.password
            };
            var renter = renterModel.findRenterByCredentials(credentials);
            res.json(renter);
        }
        else
        {
            var renters = renterModel.FindAll();
            res.json(renters);
        }
    }

    function updateRenter(req, res) {
        var renters=renterModel.Update(req.params.id, req.body);
        res.json(renters);
    }

    function deleteRenter(req, res) {
        var renters=renterModel.Delete(req.params.id);
        res.json(renters);
    }
};
