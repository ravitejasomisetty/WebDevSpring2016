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
        var vehicles=vehicleModel.registerVehicle(vehicle);
        res.json(vehicles);
    }

    function findAllVehicles(req,res){
        var req=req.body;
        var vehicles=vehicleModel.findAllVehicles();
        console.log(vehicles);
        res.json(vehicles);
    }

    function viewVehicle(req,res){
        var vehicleId=req.params.pNum;
        var vehicle=vehicleModel.viewVehicle(vehicleId);
        res.json(vehicle);
    }

    function updateVehicle(req,res){
        var vehicle=req.body;
        var vehicles=vehicleModel.updateVehicle(vehicle);
        res.json(vehicles);
    }

    function deleteVehicle(req,res){
        var pNum=req.params.pNum;
        var vehicles=vehicleModel.deleteVehicle(pNum);
        res.json(vehicles);
    }
};