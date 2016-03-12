(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("DetailsController", DetailsController);
    function DetailsController($rootScope, $scope, $routeParams) {
        $scope.success = function () {
            window.open("client/views/forms/successmessage.html");
            if ($rootScope.user) {
                $rootScope.user.instance = $scope.instance;
            }
        };
        $scope.HWRefNumber = $routeParams.HWRefNumber;
        $scope.instance = $rootScope.instance;
    }
})();
