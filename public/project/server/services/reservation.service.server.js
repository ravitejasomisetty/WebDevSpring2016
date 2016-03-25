/**
 * Created by ravit on 3/23/2016.
 */
/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (app, reservationModel) {
    app.post("/api/grabacar/reservation", newReservation);
    app.get("/api/grabacar/reservation/renterid/:renterid", findAllReservationsByRenter);
    app.get("/api/grabacar/reservation", findAllReservations);
    app.get("/api/grabacar/reservation/json/:recent", recentReservation);
    app.get("/api/grabacar/reservation/:reservationid", viewReservation);
    app.put("/api/grabacar/reservation/:reservationid", updateReservation);
    app.delete("/api/grabacar/reservation/:reservationid", deleteReservation);
    app.get("/api/grabacar/reservationByRentId/:rentid",findReservationByRentId);

    function findReservationByRentId(req,res){
        var rentid=req.params.rentid;
        var reservation=reservationModel.findReservationByRentId(rentid);
        res.json(reservation);
    }

    function recentReservation(req, res) {
        var recent = req.query.recent;
        var recentReservationJSON=null;
        if (recent=="true") {
            recentReservationJSON = reservationModel.recentReservation();
        }
        res.json(recentReservationJSON);
    }

    function findAllReservationsByRenter(req, res) {
        var renterid = req.params.renterid;
        var reservations = reservationModel.findAllReservationsByRenter(renterid);
        res.json(reservations);
    }

    function newReservation(req, res) {
        var reservation = req.body;
        var reservations = reservationModel.newReservation(reservation);
        res.json(reservations);
    }

    function findAllReservations(req, res) {
        var req = req.body;
        var reservations = reservationModel.findAllReservations();
        res.json(reservations);
    }

    function viewReservation(req, res) {
        var reservationid = req.params.reservationid;
        var reservation = reservationModel.viewReservation(reservationid);
        res.json(reservation);
    }

    function updateReservation(req, res) {
        var reservation = req.body;
        var reservations = reservationModel.updateReservation(reservation);
        res.json(reservations);
    }

    function deleteReservation(req, res) {
        var reservationid = req.params.reservationid;
        var reservations = reservationModel.deleteReservation(reservationid);
        res.json(reservations);
    }
};