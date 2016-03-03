(function () {
    angular
        .module("GrabACar")
        .controller("TellerController", TellerController);
    function TellerController(TellerService, $scope, $rootScope) {
        'use strict';
        var teller = $rootScope.teller;
        TellerService.findAlltellers(function (tellers) {
            $scope.tellers = tellers;
        });
        $scope.addForm = function (teller) {
            TellerService.createteller(teller, function (teller) {
                console.log("Added user");
            })
        }
        $scope.updateForm = function (teller) {
            TellerService.updateteller(teller, function (res) {
                console.log("updated successfully");
            })
        }

        $scope.deleteForm = function (index) {
            $scope.tellers.splice(index, 1);
        }

        $scope.selectForm = function (index) {
            $scope.teller ={
                "fullName": $scope.tellers[index].fullName,
                "address": $scope.tellers[index].address,
                "empid": $scope.tellers[index].empid,
                "mgrid": $scope.tellers[index].mgrid,
                "username": $scope.tellers[index].username,
                "password": $scope.tellers[index].password
            };
        }
    }
})();