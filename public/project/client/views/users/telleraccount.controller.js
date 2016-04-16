/**
 * Created by ravit on 4/16/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("TellerAccountController", TellerAccountController);
    function TellerAccountController($routeParams, TellerService, $location) {
        var vm = this;
        var tellerid = $routeParams.id;
        vm.viewRents = viewRents;
        vm.open = open;
        vm.viewRenters = viewRenters;

        TellerService.viewTeller(tellerid)
            .then(function (teller) {
                vm.user = teller.data;
            });

        function viewRents(user) {
            vm.viewRentersTable = false;
            vm.viewRentsTable = true;
            vm.rents = user.rentsApproved;
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