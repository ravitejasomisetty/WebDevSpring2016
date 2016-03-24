/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (app, rentModel) {
    app.post("/api/grabacar/rent", rentVehicle);
    app.get("/api/grabacar/rent", findAllRents);
    app.get("/api/grabacar/rent/:rentid", viewRent);
    app.put("/api/grabacar/rent/:rentid", updateRent);
    app.delete("/api/grabacar/rent/:rentid", deleteRent);
    app.get("/api/grabacar/teller/:employeeid/rentsApproved",findAllRentsByTeller);
    app.get("/api/grabacar/renter/:renterid/rents",findAllRentsByRenter);
    app.put("/api/grabacar/rent/:rentid/employeeid/:employeeid/approve",approveRent);

    function approveRent(req,res){
        var rentid=req.params.rentid;
        var employeeid=req.params.employeeid;
        var msg=rentModel.approveRent(rentid,employeeid);
        res.send(msg);
    }

    function findAllRentsByTeller(req,res){
        var employeeid=req.params.employeeid;
        var rents=rentModel.findAllRentsByTeller(employeeid);
        res.json(rents);
    }

    function findAllRentsByRenter(req,res){
        var renterid=req.params.renterid;
        var rents=rentModel.findAllRentsByRenter(renterid);
        res.json(rents);
    }

    function rentVehicle(req,res)
    {
        var rent=req.body;
        var rents=rentModel.rentVehicle(rent);
        res.json(rents);
    }

    function findAllRents(req,res){
        var req=req.body;
        var rents=rentModel.findAllRents();
        console.log(rents);
        res.json(rents);
    }

    function viewRent(req,res){
        var rentid=req.params.rentid;
        var rent=rentModel.viewRent(rentid);
        res.json(rent);
    }

    function updateRent(req,res){
        var rent=req.body;
        var rents=rentModel.updateRent(rent);
        res.json(rents);
    }

    function deleteRent(req,res){
        var rentid=req.params.rentid;
        var rents=rentModel.deleteRent(rentid);
        res.json(rents);
    }
};