/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("VLocationController", VLocationController);
    function VLocationController(VLocationService) {
        var vm = this;
        vm.vlocations = [];

        vm.init = function init() {
            VLocationService.findAllVLocations().then(function (res) {

                vm.vlocations = res.data;

            });
            console.log(vm.vlocations + "responed");
        }
        vm.init();
    }
})();