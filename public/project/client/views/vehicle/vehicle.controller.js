(function () {
    angular
        .module("GrabACar")
        .controller("VehicleController", VehicleController);
    function VehicleController(VehicleService) {
        'use strict';
        var vm = this;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        VehicleService.findAllVehicles()
            .then(function (vehicles) {
                vm.vehicles = vehicles.data;
            });

        function addForm(vehicle) {
            if (vehicle) {
                VehicleService.registerVehicle(vehicle)
                    .then(function (vehicles) {
                        vm.vehicles = vehicles.data;
                        console.log("Added vehicle");
                    })
            }
            else {
                alert("Fields cannot be empty");
            }
        }

        function updateForm(vehicle) {
            if (vehicle) {
                VehicleService.updateVehicle(vehicle.platenumber, vehicle)
                    .then(function (vehicles) {
                        vm.vehicles = vehicles.data;
                        console.log("updated successfully");
                    })
            }
            else {
                alert("Select by clicking EDIT to update a record");
            }
        }

        function deleteForm(vehicle) {
            VehicleService.deleteVehicle(vehicle.platenumber)
                .then(function (vehicles) {
                        vm.vehicles = vehicles.data;
                    }
                )
        }

        function selectForm(index) {
            vm.vehicle = {
                "brand": vm.vehicles[index].brand,
                "type": vm.vehicles[index].type,
                "model": vm.vehicles[index].model,
                "platenumber": vm.vehicles[index].platenumber,
                "seatquantity": vm.vehicles[index].seatquantity,
                "fueltype": vm.vehicles[index].fueltype,
                "condition": vm.vehicles[index].condition,
                "dailyprice": vm.vehicles[index].dailyprice
            };
        }
    }
})();