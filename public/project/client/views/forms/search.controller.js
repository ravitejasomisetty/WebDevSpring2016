(function () {
    angular
        .module("GrabACar")
        .controller("SearchController", SearchController);
    function SearchController($scope, $rootScope, $http) {
        'use strict';
        $scope.request = {
            "apikey": "2vq5exzbspp2d33yp327vta8",
            "dest": "",
            "startdate": "",
            "enddate": "",
            "pickuptime": "",
            "dropofftime": "",
            "format": "jsonp",
            "includeResultsLink": "true",
            "callback": "JSON_CALLBACK"
        };
        var carTypes = {
            "ECAR": "Economy car",
            "CCAR": "Compact car",
            "FCAR": "Full-Size car",
            "FFAR": "Full-Size SUV",
            "FRAR": "Full-Size SUV",
            "ICAR": "MidSize car",
            "IFAR": "Midsize SUV",
            "LCAR": "Luxury car",
            "MVAR": "Minivan",
            "PCAR": "Premium car",
            "SCAR": "Standard car",
            "SFAR": "Standard SUV",
            "SPAR": "Standard pickup truck",
            "STAR": "Convertible car",
            "SXAR": "Special car",
            "XXAR": "Special car"
        };
        $scope.pingAPI = function (request) {
            if (request.dest == "" || request.startdate == "" || request.enddate == "" || request.pickuptime == "" || request.dropofftime == "")
                alert("All the fields are required");
            else {
                var url = "http://api.hotwire.com/v1/search/car?apikey=" + $scope.request.apikey + "&dest=" +
                    $scope.request.dest + "&startdate=" + $scope.request.startdate + "&enddate=" + $scope.request.enddate + "&pickuptime=" + $scope.request.pickuptime +
                    "&dropofftime=" + $scope.request.dropofftime + "&format=jsonp&includeResultsLink=true&callback=JSON_CALLBACK";
                $http.jsonp(url).success(function (response) {
                    if (response.StatusCode != 0) {
                        $scope.errors = response.Errors;
                    }
                    else {
                        for(var i=0;i< response.Result.length;i++) {
                            var instance={"car":""};
                            instance.car=carTypes[response.Result[i].CarTypeCode];
                            response.Result[i].code=instance.car;
                        }
                        $scope.instances = response.Result;
                    }
                }).error(function (response, status, headers) {
                    console.log(response);
                });
            }
        }
    }
})();