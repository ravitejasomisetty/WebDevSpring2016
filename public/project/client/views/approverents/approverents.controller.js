/**
 * Created by ravit on 4/16/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ApproveRentsController", ApproveRentsController);
    function ApproveRentsController(TellerService, RentService, $rootScope, ReservationService) {
        var vm = this;
        var user = $rootScope.user;
        vm.approve = approve;
        vm.update = update;

        RentService.findAllRents()
            .then(function (rents) {
                vm.rents = rents.data;
            });

        function approve(rent) {
            user.rentsApproved.push({"platenumber": rent.platenumber});
            TellerService.updateTeller(user._id, user)
                .then(function (teller) {
                    ReservationService.findReservationByRentId(rent._id)
                        .then(function (reservation) {
                            reservation.data.status = "SUCCESS";
                            console.log(reservation);
                            ReservationService.updateReservation(reservation.data._id, reservation.data)
                                .then(function (reservationUpdated) {
                                    rent.status = "SUCCESS";
                                    rent.approved = true;
                                    rent.updated = true;
                                    rent.employeeid = user._id;
                                    if (rent.refund) {
                                        rent.totalprice = rent.totalprice - rent.refund;
                                    }
                                    RentService.updateRent(rent._id, rent)
                                        .then(function (rent) {
                                                RentService.findAllRents()
                                                    .then(function (rents) {
                                                        vm.rents = rents.data;
                                                    })
                                            }
                                        )
                                })

                        })

                });
        }

        function update(rent) {
            rent.updated = true;
            rent.approved = false;
            if (rent.refund) {
                rent.totalprice = rent.totalprice - rent.refund;
            }
            rent.updatedby.push(user);
            RentService.updateRent(rent._id, rent)
                .then(function (rent) {
                    RentService.findAllRents()
                        .then(function (rents) {
                            vm.rents = rents.data;
                        })
                })
        }
    }
})();