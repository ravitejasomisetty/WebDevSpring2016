/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (app, tellerModel) {
    app.post("/api/grabacar/teller", newTeller);
    app.get("/api/grabacar/teller", findAllTellers);
    app.get("/api/grabacar/teller/:employeeid", viewTeller);
    app.put("/api/grabacar/teller/:employeeid", updateTeller);
    app.delete("/api/grabacar/teller/:employeeid", deleteTeller);

    function newTeller(req,res)
    {
        var teller=req.body;
        var tellers=tellerModel.newTeller(teller);
        res.json(tellers);
    }

    function findAllTellers(req,res){
        var req=req.body;
        var tellers=tellerModel.findAllTellers();
        res.json(tellers);
    }

    function viewTeller(req,res){
        var employeeid=req.params.employeeid;
        var teller=tellerModel.viewTeller(employeeid);
        res.json(teller);
    }

    function updateTeller(req,res){
        var teller=req.body;
        var employeeid=req.params.employeeid;
        var tellers=tellerModel.updateTeller(employeeid,teller);
        res.json(tellers);
    }

    function deleteTeller(req,res){
        var employeeid=req.params.employeeid;
        var tellers=tellerModel.deleteTeller(employeeid);
        res.json(tellers);
    }
};