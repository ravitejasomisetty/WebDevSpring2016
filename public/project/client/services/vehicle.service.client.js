/**
 * Created by ravit on 3/22/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("VehicleService", VehicleService);
    function VehicleService($http) {
        var api= {
            viewVehicle: viewVehicle,
            registerVehicle:registerVehicle,
            updateVehicle:updateVehicle,
            availableVehiclesByLocation:availableVehiclesByLocation,
            findAllVehicles:findAllVehicles,
            deleteVehicle:deleteVehicle
        };

        return api;
        function availableVehiclesByLocation(location){
            var vehicles=$http.get("/api/grabacar/vehiclebylocation/"+location);
            return vehicles;
        }
        function findAllVehicles(){
            var vehicles=$http.get("/api/grabacar/vehicle");
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