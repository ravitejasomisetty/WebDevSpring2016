(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("DetailsController", DetailsController);
    function DetailsController($rootScope,$scope,$routeParams) {
        $scope.HWRefNumber=$routeParams.HWRefNumber;
        $scope.instance=$rootScope.instance;
    }
})();
