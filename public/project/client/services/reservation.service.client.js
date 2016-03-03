(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("ReservationService", ReservationService);
    function ReservationService() {
        var reservations = [
            {
                "id": 123, "platenumber": "Alice Wonderland", "pickupdate": "Indian",
                "returndate": "Hyderabad", "reservationdate": "999999999", "userid": "9/9/1999"
            }
        ];

        var findAllreservations = function (callback) {
            callback(reservations);
        };

        var createreservation = function (reservation, callback) {
            reservation = {
                "platenumber": reservation.brand,
                "pickupdate": reservation.type,
                "returndate": reservation.model,
                "reservationdate": reservation.platenumber,
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