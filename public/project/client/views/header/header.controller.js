(function(){
    'use strict';
    angular
        .module("GrabACar")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope,$rootScope,$location) {
        $scope.$location=$location;
        $scope.logout=function (){
            $rootScope.user=null;
        }
    }
})();