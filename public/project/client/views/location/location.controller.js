/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("LocationController", LocationController);
    function LocationController(LocationService) {
        var vm = this;
        vm.locations = [];

        vm.init = function init() {
            LocationService.findAllLocations().then(function (res) {

                vm.locations = res.data;

            });
            console.log(vm.locations + "responed");
        }
        vm.init();
    }
})();