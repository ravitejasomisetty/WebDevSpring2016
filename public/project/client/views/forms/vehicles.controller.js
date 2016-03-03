(function () {
    angular
        .module("GrabACar")
        .controller("VehicleController", VehicleController);
    function VehicleController(VehicleService, $scope, $rootScope) {
        'use strict';
        var vehicle = $rootScope.vehicle;
        VehicleService.findAllvehicles(function (vehicles) {
            $scope.vehicles = vehicles;
        });
        $scope.addForm = function (vehicle) {
            VehicleService.createvehicle(vehicle, function (vehicle) {
                console.log("Added vehicle");
            })
        }
        $scope.updateForm = function (vehicle) {
            VehicleService.updatevehicle(vehicle, function (res) {
                console.log("updated successfully");
            })
        }

        $scope.deleteForm = function (index) {
            $scope.vehicles.splice(index, 1);
        }

        $scope.selectForm = function (index) {
            $scope.vehicle = {
                "brand": $scope.vehicles[index].brand,
                "type": $scope.vehicles[index].type,
                "model": $scope.vehicles[index].model,
                "platenumber": $scope.vehicles[index].platenumber,
                "seatquantity": $scope.vehicles[index].seatquantity,
                "fueltype": $scope.vehicles[index].fueltype,
                "condition": $scope.vehicles[index].condition,
                "dailyprice": $scope.vehicles[index].dailyprice,
                "id": $scope.vehicles[index].id
            };
        }
    }
})();