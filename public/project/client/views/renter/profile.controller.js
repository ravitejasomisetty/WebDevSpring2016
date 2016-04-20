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
        vm.init = init;
        init();
        function init() {
            RenterService.findRenterById(renterId)
                .then(function (renter) {
                    vm.user = renter.data;
                    ReservationService.findAllReservationsByRenter(vm.user._id)
                        .then(function (res) {
                            vm.reservations = res.data;
                        })
                });
        }

        function update(userInfo) {
            if (userInfo) {
                if (userInfo.birthdate)
                    vm.activeUser.birthdate = DateService.obtainDate(userInfo.birthdate);
                if (userInfo.licenseCountry) {
                    vm.activeUser.licenseCountry = userInfo.licenseCountry;
                }
                if (userInfo.licenseNumber) {
                    vm.activeUser.licenseNumber = userInfo.licenseNumber;
                }
                if (userInfo.password) {
                    vm.activeUser.password = userInfo.password;
                }
            }
            RenterService.updateRenter(vm.activeUser._id, vm.activeUser)
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




