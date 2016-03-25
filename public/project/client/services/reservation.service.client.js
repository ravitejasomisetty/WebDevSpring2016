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
            findAllReservations:findAllReservations,
            findAllReservationsByRenter:findAllReservationsByRenter,
            recentReservation:recentReservation,
            findReservationByRentId:findReservationByRentId
        }

        function findReservationByRentId(rentid){
            var reservation=$http.get("/api/grabacar/reservationByRentId/"+rentid);
            return reservation;
        }

        function recentReservation(){
            var recentReservationJSON=$http.get("/api/grabacar/reservation/json/true");
            return recentReservationJSON;
        }

        function findAllReservationsByRenter(renterid){
            var reservations=$http.get("/api/grabacar/reservation/renterid/"+renterid);
            return reservations;
        }

        function findAllReservations(){
            var reservations=$http.get("/api/grabacar/reservation");
            return reservations;
        }

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