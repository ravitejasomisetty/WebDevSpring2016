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
        reservationModel.findReservationByRentId(req.params.rentid)
            .then(function (reservation) {
                    res.json(reservation);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    //TBF
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
        reservationModel.findAllReservationsByRenter(renterid)
            // handle model promise
            .then(
                // login user if promise resolved
                function (docs) {

                    res.json(docs);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function newReservation(req, res) {
        var reservation = req.body;
        reservation = reservationModel.newReservation(reservation)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    res.json(reservation);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllReservations(req, res) {
        reservationModel.findAllReservations()
            .then(function (reservations) {
                    res.json(reservations);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function viewReservation(req, res) {
        reservationModel.viewReservation(req.params.reservationid)
            .then(function (reservation) {
                    res.json(reservation);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateReservation(req, res) {
        var reservation = req.body;
        reservationModel.updateReservation(reservation)
            .then(function (doc) {
                    res.json(reservation);
                },// send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteReservation(req, res) {
        var reservationid = req.params.reservationid;
        reservationModel.deleteReservation(reservationid)
            .then(function (reservations) {
                    res.json(reservations);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};