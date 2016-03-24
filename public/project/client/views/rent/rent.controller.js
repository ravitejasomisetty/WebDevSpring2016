/**
 * Created by ravit on 3/22/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("RentController", RentController);
    function RentController(RentService) {
        var vm = this;
        vm.rents = [];

        vm.init = function init() {
            RentService.findAllRents().then(function (res) {

                vm.rents = res.data;

            });
            console.log(vm.rents + "responed");
        }
        vm.init();
    }
})();