/**
 * Created by ravit on 3/23/2016.
 */
/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("ReservationService", ReservationService);
    function ReservationService($http) {
        return {
            viewReservation: viewReservation,
            newReservation:newReservation,
            updateReservation:updateReservation,
            deleteReservation:deleteReservation,
            findAllReservations:findAllReservations
        }
        function findAllReservations(){
            var reservations=$http.get("/api/grabacar/reservation");
            console.log(reservations);
            return reservations;
        };

        function viewReservation(reservationid) {
            var reservation=$http.get("/api/grabacar/reservation/"+reservationid);
            return reservation;
        }

        function newReservation(reservation){
            var reservations=$http.post("/api/grabacar/reservation",reservation);
            return reservations;
        }

        function updateReservation(reservationid,reservation){
            var reservations=$http.put("/api/grabacar/reservation/"+reservationid,reservation);
            return reservations;
        }

        function deleteReservation(reservationid){
            var reservations=$http.delete("/api/grabacar/reservation/"+reservationid);
            return reservations;
        }
    }})();