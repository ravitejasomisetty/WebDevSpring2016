(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope,$routeParams, RenterService, ReservationService, $location) {
        var vm = this;
        vm.activeUser=$rootScope.user;
        var renterId=$routeParams.renterId;
        vm.update = update;
        vm.rowStatus = rowStatus;
        vm.open = open;
        RenterService.findRenterById(renterId)
            .then(function(renter){
                console.log(renter);
                vm.user=renter.data;
                ReservationService.findAllReservationsByRenter(vm.user._id)
                    .then(function (res) {
                        vm.reservations = res.data;
                    })
            });

        function update() {
            RenterService.updateRenter(vm.user._id, vm.user)
                .then(
                    RenterService.refresh()
                        .then(function (res) {
                            alert("Profile information is successfully updated");
                        }));
        }

        function rowStatus(reservation) {
            if (reservation.status == "CANCEL")
                return "danger";
            else if (reservation.status == "SUCCESS")
                return "warning";
            else if (reservation.status == "RESERVED")
                return "info";
        }

        function open(path) {
            $location.url(path);
        }
    }
})();




