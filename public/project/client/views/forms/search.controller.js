(function () {
        angular
            .module("GrabACar")
            .controller("SearchController", SearchController);
        function SearchController($scope, $rootScope, $http, $location, $window) {
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
            //START





            //END
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
            var carImages = {
                "ECAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/econ.png",
                "CCAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/compact.png",
                "FCAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/FullSize.png",
                "FFAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/FullSize_SUV.png",
                "FRAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/FullSize_SUV.png",
                "ICAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Midsize.png",
                "IFAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Midsize_SUV.png",
                "LCAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Luxury.png",
                "MVAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Minivan.png",
                "PCAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Premium.png",
                "SCAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Standard.png",
                "SFAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Standard_SUV_correct.png",
                "SPAR": "",
                "STAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Convertible.png",
                "SXAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Special.png",
                "XXAR": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/Special.png"
            }
            $scope.pingAPI = function (request) {
                if (request.dest == "" || request.startdate == "" || request.enddate == "" || request.pickuptime == "" || request.dropofftime == "") {//alert("All the fields are required");
                }
                else {
                    var url = "http://api.hotwire.com/v1/search/car?apikey=" + $scope.request.apikey + "&dest=" +
                        $scope.request.dest + "&startdate=" + $scope.request.startdate + "&enddate=" + $scope.request.enddate + "&pickuptime=" + $scope.request.pickuptime +
                        "&dropofftime=" + $scope.request.dropofftime + "&format=jsonp&includeResultsLink=true&callback=JSON_CALLBACK";
                    $http.jsonp(url).success(function (response) {
                        if (response.StatusCode != 0) {
                            $scope.errors = response.Errors;
                        }
                        else {
                            for (var i = 0; i < response.Result.length; i++) {
                                carTypes = response.MetaData.CarMetaData.CarTypes;
                                for (var j = 0; j < carTypes.length; j++) {
                                    if (response.Result[i].CarTypeCode == carTypes[j].CarTypeCode)
                                        response.Result[i].Metadata = carTypes[j];
                                }
                                var instance = {"image": "", "carType": ""};
                                instance.image = carImages[response.Result[i].CarTypeCode];
                                //instance.carType=carTypes[response.Result[i].CarTypeCode];
                                response.Result[i].carImage = instance.image;
                                //response.Result[i].carType=instance.carType;
                            }
                            $scope.instances = response.Result;
                        }
                    }).error(function (response, status, headers) {
                        console.log(response);
                    });
                }
            }

            $scope.open = function (path, instance) {
                $rootScope.instance = instance;
                $location.url(path);
                /*   $window.open('/FFProject/public/project/index.html#' + path);*/
            }
        }
    })();