/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (mongoose,db,uuid) {
    var q = require("q");
    var ReservationSchema = require('./reservation.schema.server.js')(mongoose);
    var ReservationModel = mongoose.model("ReservationModel", ReservationSchema);
    var reservations = [{
        "platenumber": "4HS821",
        "pickupdate": "3/19/2016",
        "returndate": "3/21/2016",
        "reservationdate": "3/19/2016",
        "status": "SUCCESS",
        "reservationid": "10",
        "renterid": "123",
        "rentid": "123"
    },
        {
            "platenumber": "F62BGM",
            "pickupdate": "3/31/2016",
            "returndate": "4/6/2016",
            "reservationdate": "3/19/2016",
            "status": "RESERVED",
            "reservationid": "10",
            "renterid": "123",
            "rentid": "345"
        },
        {
            "platenumber": "AHEIWP",
            "pickupdate": "3/29/2016",
            "returndate": "4/2/2016",
            "reservationdate": "3/19/2016",
            "status": "CANCEL",
            "reservationid": "10",
            "renterid": "123",
            "rentid": "456"
        }];
    var recentReservationJSON;
    return {
        viewReservation: viewReservation,
        newReservation: newReservation,
        updateReservation: updateReservation,
        deleteReservation: deleteReservation,
        recentReservation: recentReservation,
        findAllReservations: findAllReservations,
        findAllReservationsByRenter: findAllReservationsByRenter,
        findReservationByRentId: findReservationByRentId
    }

    function findReservationByRentId(rentid) {
        var deferred = q.defer();
        ReservationModel.findOne({"rentid":rentid}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //TBF
    function recentReservation() {
        return recentReservationJSON;
    }
    //TBF
    function findAllReservationsByRenter(renterid) {
        var deferred = q.defer();
        ReservationModel.find({renterid:renterid},function(err,docs){
            deferred.resolve(docs);
        });
        return deferred.promise;
    }

    function findAllReservations() {
        var deferred = q.defer();
        ReservationModel.find(function (err, reservations) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(reservations);
            }
        });
        return deferred.promise;
    }

    function viewReservation(reservationid) {
        var deferred = q.defer();
        ReservationModel.findById(reservationid, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function newReservation(reservation) {
        var deferred = q.defer();

        // insert new user with mongoose renter model's create()
        ReservationModel.create(reservation, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                recentReservationJSON = reservation;
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function updateReservation(reservation) {
        var deferred = q.defer();

        // find the reservation
        ReservationModel.findById(reservation._id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.platenumber=reservation.platenumber;
                doc.pickupdate=reservation.pickupdate;
                doc.returndate=reservation.returndate;
                doc.reservationdate=reservation.reservationdate;
                doc.status=reservation.status;
                doc.renterid=reservation.renterid;
                doc.rentid=reservation.rentid;
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with renter
                        deferred.resolve(doc);
                    }
                });
            }});
        return deferred.promise;
    }

    function deleteReservation(reservationid) {
        var deferred = q.defer();
        ReservationModel.remove({_id:reservationid}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};