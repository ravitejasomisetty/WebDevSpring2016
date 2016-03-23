(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("MyReservationsController", MyReservationsController);
    function MyReservationsController($rootScope) {
        var vm=this;
        vm.instance = $rootScope.user.instance;
        var today = new Date();
        var pickupDate=new Date(vm.instance.PickupDay);
        var constant=1000*60*60*24;
        var diffDays=Math.round((pickupDate-today)/constant);
        if (diffDays>2)
            vm.canBeCancelled = true;
        else {
            vm.canBeCancelled = false;
            vm.CancellationInfo = "You may not make any changes to this reservation";
        }

        vm.cancel = function () {
            $rootScope.user.instance = null;
            vm.canBeCancelled = false;
            vm.CancellationInfo = "Your reservation has been cancelled successfully";
        }

    }
})();

