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
            "licenseCountry": "United States",
            "status":"Waiting for approval"
        }, {
            "birthdate": "03/23/1992",
            "fullName": "Alice Wonderland",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Approved"
        }, {
            "birthdate": "03/23/1992",
            "fullName": "Alice Wonderland",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Declined"
        }];

        $scope.approve=function(user){
            user.status="Approved";
            $scope.user.approved=true;
            $scope.user.declined=false;
        }

        $scope.decline=function(user){
            user.status="Declined";
            $scope.user.declined=true;
            $scope.user.approved=false;
        }
    }
})();