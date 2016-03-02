(function(){
    'use strict';
    angular
        .module("GrabACar")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope,$location) {
        $scope.$location=$location;
    }
})();