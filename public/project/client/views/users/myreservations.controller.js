(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("MyReservationsController", MyReservationsController);
    function MyReservationsController($rootScope, RentService, $routeParams, DateService, ReservationService) {
        var vm = this;
        vm.init = init;
        vm.cancel = cancel;
        vm.rentid = $routeParams.rentid;
        vm.instance = {};
        function init() {
            RentService.viewRent(vm.rentid)
                .then(function (res) {
                    vm.instance = res.data;
                    var diffDays = DateService.diffInDays(new Date(), new Date(vm.instance.rentdate));
                    vm.canBeCancelled = res.data.status.indexOf('CANCEL') < 0;
                    if (vm.canBeCancelled) {
                        if (diffDays > 2)
                            vm.canBeCancelled = true;
                        else {
                            vm.canBeCancelled = false;
                        }
                    }
                    else {
                        vm.CancellationInfo = "You may not make any changes to this reservation";
                    }
                })
        }

        init();

        function cancel() {
            RentService.cancelRent(vm.rentid)
                .then(function (res) {
                    ReservationService.findReservationByRentId(vm.rentid)
                        .then(function (resRes) {
                            var reservation = resRes.data;
                            reservation.status = "CANCEL";
                            ReservationService.updateReservation(reservation.reservationid, reservation)
                                .then(function (updateRes) {
                                    vm.canBeCancelled = !res.data;
                                    vm.CancellationInfo = "Your reservation has been cancelled successfully";
                                })
                        })
                });
        }


    }
})();

