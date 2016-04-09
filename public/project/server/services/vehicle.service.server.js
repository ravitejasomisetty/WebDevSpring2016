/**
 * Created by ravit on 3/22/2016.
 */
module.exports = function (app, vehicleModel) {
    app.post("/api/grabacar/vehicle", registerVehicle);
    app.get("/api/grabacar/vehicle", findAllVehicles);
    app.get("/api/grabacar/vehicle/:pNum", viewVehicle);
    app.put("/api/grabacar/vehicle/:pNum", updateVehicle);
    app.delete("/api/grabacar/vehicle/:pNum", deleteVehicle);

    function registerVehicle(req,res)
    {
        var vehicle=req.body;
        vehicleModel.registerVehicle(vehicle)
            .then(function (vehicles) {
                    res.json(vehicles);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAllVehicles(req,res){
        vehicleModel.findAllVehicles()
            .then(function (vehicles) {
                    res.json(vehicles);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function viewVehicle(req,res){
        var vehicleId=req.params.pNum;
        vehicleModel.viewVehicle(vehicleId)
            .then(function (vehicle) {
                    res.json(vehicle);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateVehicle(req,res){
        var vehicle=req.body;
        vehicleModel.updateVehicle(vehicle)
            .then(function (doc) {
                    res.json(doc);
                },// send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteVehicle(req,res){
        var pNum=req.params.pNum;
        vehicleModel.deleteVehicle(pNum)
            .then(function (msg) {
                    res.json(msg);
                },
                function (err) {
                    res.status(400).send(err);
                });

    }
};