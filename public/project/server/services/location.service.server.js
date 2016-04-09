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
        locationModel.newLocation(location)
            .then(function (locations) {
                    res.json(locations);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAllLocations(req,res){
        var locations=locationModel.findAllLocations();
        locationModel.findAllLocations()
            .then(function (locations) {
                    res.json(locations);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function viewLocation(req,res){
        var locationid=req.params.locationid;
        locationModel.viewLocation(locationid)
            .then(function (location) {
                    res.json(location);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateLocation(req,res){
        var location=req.body;
        locationModel.updateLocation(location)
            .then(function (doc) {
                    res.json(doc);
                },// send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteLocation(req,res){
        var locationid=req.params.locationid;
        locationModel.deleteLocation(locationid)
            .then(function (msg) {
                    res.json(msg);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};