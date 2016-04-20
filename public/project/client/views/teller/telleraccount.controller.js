/**
 * Created by ravit on 4/16/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("TellerAccountController", TellerAccountController);
    function TellerAccountController($routeParams, TellerService, $location, RentService) {
        var vm = this;
        var tellerid = $routeParams.id;
        vm.viewRents = viewRents;
        vm.open = open;
        vm.viewRenters = viewRenters;

        TellerService.viewTeller(tellerid)
            .then(function (teller) {
                vm.activeUser = teller.data;
                RentService.findAllRentsByTeller(teller.data._id)
                    .then(function (res) {
                        vm.viewRentersTable = false;
                        vm.viewRentsTable = true;
                        vm.rents = res.data;
                    });
            }, function (err) {
                $location.url("/home");
            });

        function viewRents(user) {
            RentService.findAllRentsByTeller(user._id)
                .then(function (res) {
                    vm.viewRentersTable = false;
                    vm.viewRentsTable = true;
                    vm.rents = res.data;
                })
        }

        function viewRenters(user) {
            vm.viewRentsTable = false;
            vm.viewRentersTable = true;
            vm.renters = user.rentersEvaluated;
        }

        function open(path) {
            $location.url(path);
        }
    }
})();