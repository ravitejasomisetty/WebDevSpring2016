/**
 * Created by ravit on 3/22/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("VehicleController", VehicleController);
    function VehicleController(VehicleService) {
        var vm = this;
        console.log("hi");
        VehicleService.findAllVehicles()
            .then(function (res) {
                if (res) {
                    vm.vehicles = res.data;
                }
            });
        console.log(vm.vehicles+"responed");
    }
})();