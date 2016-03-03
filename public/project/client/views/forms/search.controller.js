(function () {
    angular
        .module("GrabACar")
        .controller("SearchController", SearchController);
    function SearchController($scope, $rootScope) {
        'use strict';
        $scope.request = {
            "apikey": "2vq5exzbspp2d33yp327vta8",
            "dest": "",
            "startdate": "",
            "enddate": "",
            "pickuptime": "",
            "dropofftime": ""
        };
        $scope.pingAPI = function (request) {
            console.log(request);
        }
    }
})();