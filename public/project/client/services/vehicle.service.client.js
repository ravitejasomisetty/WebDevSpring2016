/**
 * Created by ravit on 3/22/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("VehicleService1", VehicleService);
    function VehicleService($http) {
        var api= {
            viewVehicle: viewVehicle,
            registerVehicle:registerVehicle,
            updateVehicle:updateVehicle,
            findAllVehicles:findAllVehicles,
            deleteVehicle:deleteVehicle
        };

        return api;
        function findAllVehicles(){
            var vehicles=$http.get("/api/grabacar/vehicle");
            console.log(vehicles);
            return vehicles;
        };

        function viewVehicle(plateNum) {
            var vehicle=$http.get("/api/grabacar/vehicle/"+plateNum);
            return vehicle;
        }

        function registerVehicle(vehicle){
            var vehicles=$http.post("/api/grabacar/vehicle",vehicle);
            return vehicles;
        }

        function updateVehicle(pNum,vehicle){
            var vehicles=$http.put("/api/grabacar/vehicle/"+pNum,vehicle);
            return vehicles;
        }

        function deleteVehicle(plateNum){
            var vehicles=$http.delete("/api/grabacar/vehicle/"+plateNum);
            return vehicles;
        }
    }})();