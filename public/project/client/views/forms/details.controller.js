(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("DetailsController", DetailsController);
    function DetailsController($rootScope, $scope, $routeParams) {
        var sample = {
            "CurrencyCode": "USD",
            "DeepLink": "https://www.hotwire.com/car/deeplink-details.jsp?resultId=OTI3MTQ0NTUyMDo0NzIyNTU4MTU0NjQ-&useCluster=4&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=4",
            "ResultId": "OTI3MTQ0NTUyMDo0NzIyNTU4MTU0NjQ-&useCluster=4",
            "ResultsDeepLink": "https://www.hotwire.com/car/search-options.jsp?inputId=car-index&isOneWaySearch=false&startSearchType=N&startLocation=LAX&endLocation=LAX&startDate=04/20/16&startTime=1000&endDate=04/23/16&endTime=1330&carType=FFAR&carVendor=AL&dailyPrice=73.23&currencyCode=USD",
            "HWRefNumber": "4808717939",
            "SubTotal": "292.92",
            "TaxesAndFees": "72.40",
            "TotalPrice": "365.32",
            "CarTypeCode": "FFAR",
            "DailyRate": "73.23",
            "DropoffDay": "04/23/2016",
            "DropoffTime": "13:30",
            "PickupDay": "04/20/2016",
            "PickupTime": "10:00",
            "LocationDescription": "Counter in airport; Shuttle to car",
            "MileageDescription": "Unlimited",
            "PickupAirport": "LAX",
            "RentalDays": "4",
            "carImage": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/FullSize_SUV.png",
            "Metadata": {
                "TypicalSeating": "7 adults",
                "CarTypeName": "Full Size SUV",
                "CarTypeCode": "FFAR",
                "PossibleFeatures": "Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Cruise Control, AM/FM Stereo, CD Player",
                "PossibleModels": "Chevy Tahoe, Toyota Highlander, or similar"
            }
        }

        $scope.HWRefNumber = $routeParams.HWRefNumber;
        $scope.instance = $rootScope.instance;
    }
})();
