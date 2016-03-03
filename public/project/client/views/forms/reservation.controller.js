(function () {
    angular
        .module("GrabACar")
        .controller("ReservationController", ReservationController);
    function ReservationController(ReservationService, $scope, $rootScope) {
        'use strict';
        var reservation = $rootScope.reservation;
        ReservationService.findAllreservations(function (reservations) {
            $scope.reservations = reservations;
        });
        $scope.addForm = function (reservation) {
            ReservationService.createreservation(reservation, function (reservation) {
                console.log("Added reservation");
            })
        }
        $scope.updateForm = function (reservation) {
            ReservationService.updatereservation(reservation, function (res) {
                console.log("updated successfully");
            })
        }

        $scope.deleteForm = function (index) {
            $scope.reservations.splice(index, 1);
        }

        $scope.selectForm = function (index) {
            $scope.reservation = {
                "platenumber": $scope.reservations[index].platenumber,
                "pickupdate": $scope.reservations[index].pickupdate,
                "returndate": $scope.reservations[index].returndate,
                "reservationdate": $scope.reservations[index].reservationdate,
                "id": $scope.reservations[index].id,
                "userid": $scope.reservations[index].userid
            };
        }
    }
})();