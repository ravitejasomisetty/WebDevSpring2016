(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, RenterService, ReservationService, $location) {
        var vm = this;
        vm.update = update;
        vm.rowStatus = rowStatus;
        vm.myReservations = myReservations;
        vm.open = open;

        vm.user = {
            "_id": $rootScope.user._id,
            "firstName": $rootScope.user.firstName,
            "lastName": $rootScope.user.lastName,
            "rentername": $rootScope.user.rentername,
            "city": $rootScope.user.city,
            "nationality": $rootScope.user.nationality,
            "mobilenumber": $rootScope.user.mobilenumber,
            "birthdate": $rootScope.user.birthdate,
            "licenseNumber": $rootScope.user.licenseNumber,
            "licenseCountry": $rootScope.user.licenseCountry,
            "password": $rootScope.user.password,
            "status": $rootScope.user.status,
            "email": $rootScope.user.email,
            "roles": $rootScope.user.roles
        };
        myReservations();
        function myReservations() {
            ReservationService.findAllReservationsByRenter(vm.user._id)
                .then(function (res) {
                    vm.reservations = res.data;
                })
        }

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




