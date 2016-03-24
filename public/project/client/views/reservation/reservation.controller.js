/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ReservationController", ReservationController);
    function ReservationController(ReservationService) {
        var vm = this;
        vm.reservations = [];

        vm.init = function init() {
            ReservationService.findAllReservations().then(function (res) {

                vm.reservations = res.data;

            });
            console.log(vm.reservations + "responed");
        }
        vm.init();
    }
})();