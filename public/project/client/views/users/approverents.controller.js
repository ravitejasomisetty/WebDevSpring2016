/**
 * Created by ravit on 4/16/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ApproveRentsController", ApproveRentsController);
    function ApproveRentsController(TellerService, RentService, $rootScope) {
        var vm = this;
        var user = $rootScope.user;
        vm.approve = approve;
        vm.update = update;

        RentService.findAllRents()
            .then(function (rents) {
                vm.rents = rents.data;
            });

        function approve(rent) {
            rent.status = "SUCCESS";
            rent.approved = true;
            rent.updated = true;
            user.rentsApproved.push({"platenumber": rent.platenumber});
            TellerService.updateTeller(user._id, user)
                .then(function (teller) {
                    RentService.updateRent(rent._id, rent)
                        .then(function (rent) {
                                RentService.findAllRents()
                                    .then(function (rents) {
                                        vm.rents = rents.data;
                                    })
                            }
                        )
                });
        }

        function update(rent) {
            rent.updated = true;
            rent.approved = false;
            console.log(user);
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