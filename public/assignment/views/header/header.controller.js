(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope,$rootScope,$location) {
        $scope.$location=$location;
        console.log($rootScope.user);
        $scope.currentUser=$rootScope.user;
    }
})();