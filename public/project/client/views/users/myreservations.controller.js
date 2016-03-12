(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("MyReservationsController", MyReservationsController);
    function MyReservationsController($scope, $location, $rootScope) {
        $scope.instance = $rootScope.user.instance;
        var today = new Date();
        var pickupDate=new Date($scope.instance.PickupDay);
        var constant=1000*60*60*24;
        var diffDays=Math.round((pickupDate-today)/constant);
        if (diffDays>2)
            $scope.canBeCancelled = true;
        else {
            $scope.canBeCancelled = false;
            $scope.CancellationInfo = "You may not make any changes to this reservation";
        }

        $scope.cancel = function () {
            $rootScope.user.instance = null;
            $scope.canBeCancelled = false;
            $scope.CancellationInfo = "Your reservation has been cancelled successfully";
        }

    }
})();

