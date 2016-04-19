/**
 * Created by ravit on 4/9/2016.
 */
(function () {
    angular
        .module("GrabACar")
        .controller("VehicleController", VehicleController);
    function VehicleController(VehicleService) {

        var vm = this;
        vm.addVehicle = addVehicle;
        vm.init = init;
        init();
        
        function init() {
            VehicleService.findAllVehicles()
                .then(function (res) {
                    vm.vehicles = res.data;
                });
        }

        function addVehicle(vehicle) {
            VehicleService.registerVehicle(vehicle)
                .then(function (res) {
                    VehicleService.findAllVehicles()
                        .then(function (vehicles) {
                            vm.vehicles = vehicles.data;
                        });
                })
        }

    }
})();