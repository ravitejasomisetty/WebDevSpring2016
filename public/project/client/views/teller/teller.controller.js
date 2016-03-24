/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("TellerController", TellerController);
    function TellerController(TellerService) {
        var vm = this;
        vm.tellers = [];

        vm.init = function init() {
            TellerService.findAllTellers().then(function (res) {

                vm.tellers = res.data;

            });
            console.log(vm.tellers + "responed");
        }
        vm.init();
    }
})();