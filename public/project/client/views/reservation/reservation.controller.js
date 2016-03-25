(function () {
    angular
        .module("GrabACar")
        .controller("ReservationController", ReservationController);
    function ReservationController(ReservationService, DateService) {
        'use strict';
        var vm = this;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        ReservationService.findAllReservations()
            .then(function (reservations) {
                vm.reservations = reservations.data;
            });

        function addForm(reservation) {
            if (reservation) {
                ReservationService.newReservation(reservation)
                    .then(function (reservations) {
                        vm.reservations = reservations.data;
                        console.log("Added reservation");
                    })
            }
            else {
                alert("Fields cannot be empty");
            }
        }

        function updateForm(reservation) {
            if (reservation) {
                var reservationCopy = {
                    "platenumber": reservation.platenumber,
                    "reservationid": reservation.reservationid,
                    "renterid": reservation.renterid
                }
                reservationCopy.pickupdate = DateService.obtainDate(reservation.pickupdate);
                reservationCopy.returndate = DateService.obtainDate(reservation.returndate);
                reservationCopy.reservationdate = DateService.obtainDate(reservation.reservationdate);
                ReservationService.updateReservation(reservationCopy.reservationid, reservationCopy)
                    .then(function (reservations) {
                        vm.reservations = reservations.data;
                        console.log("updated successfully");
                    })
            }
            else {
                alert("Select by clicking EDIT to update a record");
            }
        }

        function deleteForm(reservation) {
            ReservationService.deleteReservation(reservation.reservationid)
                .then(function (res) {
                    vm.reservations = res.data;
                })
        }

        function selectForm(index) {
            vm.reservation = {
                "platenumber": vm.reservations[index].platenumber,
                "reservationid": vm.reservations[index].reservationid,
                "renterid": vm.reservations[index].renterid
            };
        }
    }
})();