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
            approveRent:approveRent
        }

        function findAllRentsByTeller(employeeid){
            var rents=$http.get("/api/grabacar/teller/"+tellerid+"/rentsApproved");
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
            console.log(rents);
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