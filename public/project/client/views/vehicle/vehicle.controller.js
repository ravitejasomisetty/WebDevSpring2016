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

        VehicleService.findAllVehicles()
            .then(function (res) {
                vm.vehicles = res.data;
                console.log(vm.vehicles);
            })

        function addVehicle(vehicle) {
            VehicleService.registerVehicle(vehicle)
                .then(function (res) {
                    console.log(res.data);
                })
        }

    }
})();