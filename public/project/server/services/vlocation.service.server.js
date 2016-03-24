/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (app, vlocationModel) {
    app.post("/api/grabacar/vlocation", newVLocation);
    app.get("/api/grabacar/vlocation", findAllVLocations);
    app.get("/api/grabacar/vlocation/:id", viewVLocation);
    app.put("/api/grabacar/vlocation/:id", updateVLocation);
    app.delete("/api/grabacar/vlocation/:id", deleteVLocation);

    function newVLocation(req,res)
    {
        var vlocation=req.body;
        var vlocations=vlocationModel.newVLocation(vlocation);
        res.json(vlocations);
    }

    function findAllVLocations(req,res){
        var req=req.body;
        var vlocations=vlocationModel.findAllVLocations();
        console.log(vlocations);
        res.json(vlocations);
    }

    function viewVLocation(req,res){
        var id=req.params.id;
        var vlocation=vlocationModel.viewVLocation(id);
        res.json(vlocation);
    }

    function updateVLocation(req,res){
        var vlocation=req.body;
        var vlocations=vlocationModel.updateVLocation(vlocation);
        res.json(vlocations);
    }

    function deleteVLocation(req,res){
        var id=req.params.id;
        var vlocations=vlocationModel.deleteVLocation(id);
        res.json(vlocations);
    }
};