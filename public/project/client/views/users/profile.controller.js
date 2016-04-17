(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $routeParams, RenterService, ReservationService, $location, DateService) {
        var vm = this;
        vm.activeUser = $rootScope.user;
        var renterId = $routeParams.renterId;
        vm.update = update;
        vm.rowStatus = rowStatus;
        vm.open = open;
        RenterService.findRenterById(renterId)
            .then(function (renter) {
                console.log(renter);
                vm.user = renter.data;
                ReservationService.findAllReservationsByRenter(vm.user._id)
                    .then(function (res) {
                        vm.reservations = res.data;
                    })
            });

        function update(user) {
            user.rentername = vm.activeUser.rentername;
            user.password = vm.activeUser.password;
            user.status=vm.activeUser.status;
            if (user.fullname) {
                var nameSplit = user.fullname.split(' ');
                user.firstName = nameSplit[0];
                user.lastName = nameSplit[1];
            }
            RenterService.updateRenter(vm.activeUser._id, user)
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




