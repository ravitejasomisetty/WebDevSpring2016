/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("RentService", RentService);
    function RentService($http) {
        return {
            viewRent: viewRent,
            rentVehicle:rentVehicle,
            updateRent:updateRent,
            deleteRent:deleteRent,
            findAllRents:findAllRents,
            findAllRentsByRenter:findAllRentsByRenter,
            findAllRentsByTeller:findAllRentsByTeller,
            approveRent:approveRent,
            recentRent:recentRent,
            cancelRent:cancelRent
        }

        function cancelRent(rentid){
            var cancelled=$http.put("/api/grabacar/rent/"+rentid+"/cancel");
            return cancelled;
        }

        function recentRent(){
            var recentRentJSON=$http.get("/api/grabacar/rent/json/true");
            return recentRentJSON;
        }

        function findAllRentsByTeller(employeeid){
            var rents=$http.get("/api/grabacar/teller/"+employeeid+"/rentsApproved");
            return rents;
        }

        function findAllRentsByRenter(renterid){
            var rents=$http.get("/api/grabacar/renter/"+renterid+"/rents");
            return rents;
        }

        function approveRent(rentid,employeeid){
            var msg=$http.put("/api/grabacar/rent/"+rentid+"/employeeid/"+employeeid+"/approve");
            return msg;
        }

        function findAllRents(){
            var rents=$http.get("/api/grabacar/rent");
            return rents;
        };

        function viewRent(rentid) {
            var rent=$http.get("/api/grabacar/rent/"+rentid);
            return rent;
        }

        function rentVehicle(rent){
            var rents=$http.post("/api/grabacar/rent",rent);
            return rents;
        }

        function updateRent(rentid,rent){
            var rents=$http.put("/api/grabacar/rent/"+rentid,rent);
            return rents;
        }

        function deleteRent(rentid){
            var rents=$http.delete("/api/grabacar/rent/"+rentid);
            return rents;
        }
    }})();