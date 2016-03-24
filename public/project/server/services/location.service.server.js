/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (app, locationModel) {
    app.post("/api/grabacar/location", newLocation);
    app.get("/api/grabacar/location", findAllLocations);
    app.get("/api/grabacar/location/:locationid", viewLocation);
    app.put("/api/grabacar/location/:locationid", updateLocation);
    app.delete("/api/grabacar/location/:locationid", deleteLocation);

    function newLocation(req,res)
    {
        var location=req.body;
        var locations=locationModel.newLocation(location);
        res.json(locations);
    }

    function findAllLocations(req,res){
        var req=req.body;
        var locations=locationModel.findAllLocations();
        console.log(locations);
        res.json(locations);
    }

    function viewLocation(req,res){
        var locationid=req.params.locationid;
        var location=locationModel.viewLocation(locationid);
        res.json(location);
    }

    function updateLocation(req,res){
        var location=req.body;
        var locations=locationModel.updateLocation(location);
        res.json(locations);
    }

    function deleteLocation(req,res){
        var locationid=req.params.locationid;
        var locations=locationModel.deleteLocation(locationid);
        res.json(locations);
    }
};