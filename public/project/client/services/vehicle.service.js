(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("VehicleService", VehicleService);
    function VehicleService() {
        var vehicles = [
            {
                "id": 123, "brand": "Toyota", "type": "Economy",
                "model": "Corolla", "platenumber": "4HS821", "seatquantity": "4",
                "fueltype": "gas", "condition": "Good", "dailyprice": "30"
            }
        ];

        var findAllvehicles = function (callback) {
            callback(vehicles);
        };

        var createvehicle = function (vehicle, callback) {
            vehicle = {
                "brand": vehicle.brand,
                "type": vehicle.type,
                "model": vehicle.model,
                "platenumber": vehicle.platenumber,
                "seatquantity": vehicle.seatquantity,
                "fueltype": vehicle.fueltype,
                "condition": vehicle.condition,
                "dailyprice": vehicle.dailyprice,
                "id": (new Date).getTime()
            };
            vehicles.push(vehicle);
            callback(vehicle);
        };

        var updatevehicle = function (vehicle, callback) {
            var vehicleId = vehicle.id;
            for (var i = 0; i < vehicles.length; i++) {
                if (vehicleId == vehicles[i].id) {
                    vehicles[i].brand = vehicle.brand;
                    vehicles[i].type=vehicle.type;
                    vehicles[i].model=vehicle.model;
                    vehicles[i].platenumber=vehicle.platenumber;
                    vehicles[i].seatquantity=vehicle.seatquantity;
                    vehicles[i].fueltype=vehicle.fueltype;
                    vehicles[i].condition=vehicle.condition;
                    vehicles[i].dailyprice=vehicle.dailyprice;
                    vehicles[i].id=vehicle.id;
                    return callback(vehicle);
                }
            }
        };
        return {
            findAllvehicles: findAllvehicles,
            createvehicle: createvehicle,
            updatevehicle: updatevehicle
        }
    }
})();