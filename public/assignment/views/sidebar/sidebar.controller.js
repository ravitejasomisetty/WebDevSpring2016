(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope,$rootScope,$location) {
        $scope.$location=$location;
        $scope.currentUser=$rootScope.user;
    }
})();