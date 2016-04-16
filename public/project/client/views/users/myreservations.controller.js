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
                            vm.CancellationInfo = "You may not make any changes to this reservation";
                        }
                    }
                    else {
                        vm.CancellationInfo = "This reservation of yours had been cancelled upon your request";
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
                            ReservationService.updateReservation(reservation._id, reservation)
                                .then(function (updateRes) {
                                    vm.canBeCancelled = !res.data;
                                    vm.CancellationInfo = "Your reservation has been cancelled successfully";
                                })
                        })
                });
        }


    }
})();

