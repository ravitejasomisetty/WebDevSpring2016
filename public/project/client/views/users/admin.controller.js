(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("AdminController", AdminController);
    function AdminController($scope, $rootScope) {
        $scope.users = [{
            "birthdate": "03/23/1992",
            "fullName": "Alice Wonderland",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States"
        }, {
            "birthdate": "03/23/1992",
            "fullName": "Alice Wonderland",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States"
        }, {
            "birthdate": "03/23/1992",
            "fullName": "Alice Wonderland",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States"
        }];
    }
})();