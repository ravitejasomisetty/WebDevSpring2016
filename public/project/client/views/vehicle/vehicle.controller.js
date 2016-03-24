/**
 * Created by ravit on 3/22/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("VehicleController", VehicleController);
    function VehicleController(VehicleService1) {
        var vm = this;
        console.log("hi");
        vm.vehicles = [];

        vm.init = function init() {
            VehicleService1.findAllVehicles().then(function (res) {

                vm.vehicles = res.data;

            });
            console.log(vm.vehicles + "responed");
        }
        vm.init();
    }
})();