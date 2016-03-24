(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("ReservationService", ReservationService);
    function ReservationService() {
        var reservations = [
            {
                "id": 123, "platenumber": "4HS821", "pickupdate": new Date("3/10/2016"),
                "returndate": new Date("3/15/2016"), "reservationdate": new Date("3/8/2016"), "userid": "1234"
            }
        ];

        var findAllreservations = function (callback) {
            callback(reservations);
        };

        var createreservation = function (reservation, callback) {
            reservation = {
                "platenumber": reservation.platenumber,
                "pickupdate": reservation.pickupdate,
                "returndate": reservation.returndate,
                "reservationdate": reservation.reservationdate,
                "id": (new Date).getTime(),
                "userid": reservation.userid
            };
            reservations.push(reservation);
            callback(reservation);
        };

        var updatereservation = function (reservation, callback) {
            var reservationId = reservation.id;
            for (var i = 0; i < reservations.length; i++) {
                if (reservationId == reservations[i].id) {
                    reservations[i].platenumber = reservation.platenumber;
                    reservations[i].pickupdate = reservation.pickupdate;
                    reservations[i].returndate = reservation.returndate;
                    reservations[i].reservationdate = reservation.reservationdate;
                    reservations[i].id = reservation.id;
                    reservations[i].userid = reservation.userid;
                    return callback(reservation);
                }
            }
        };
        return {
            findAllreservations: findAllreservations,
            createreservation: createreservation,
            updatereservation: updatereservation
        }
    }
})();