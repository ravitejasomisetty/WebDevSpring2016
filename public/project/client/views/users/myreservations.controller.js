(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("MyReservationsController", MyReservationsController);
    function MyReservationsController($scope, $location, $rootScope) {
        $scope.instance=$rootScope.user.instance;
    }
})();

