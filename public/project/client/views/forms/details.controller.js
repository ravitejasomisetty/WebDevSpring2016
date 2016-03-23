(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("DetailsController", DetailsController);
    function DetailsController($rootScope, $routeParams) {
        var vm=this;
        vm.success = function () {
            window.open("client/views/forms/successmessage.html");
            if ($rootScope.user) {
                $rootScope.user.instance = vm.instance;
            }
        };
        vm.HWRefNumber = $routeParams.HWRefNumber;
        vm.instance = $rootScope.instance;
    }
})();
