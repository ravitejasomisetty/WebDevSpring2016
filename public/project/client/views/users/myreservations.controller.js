(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("MyReservationsController", MyReservationsController);
    function MyReservationsController($scope, $location, $rootScope) {
        $scope.instance = $rootScope.user.instance;

        var today = new Date();
        if (today.valueOf() < $scope.instance.pickupdate.valueOf())
            $scope.canBeCancelled = true;
        else {
            $scope.canBeCancelled = false;
            $scope.CancellationInfo="You may not make any changes to this reservation";
        }

        $scope.cancel=function(){
            $rootScope.user.instance=null;
            $scope.canBeCancelled=false;
            $scope.CancellationInfo="Your reservation has been cancelled successfully";
        }

    }
})();

