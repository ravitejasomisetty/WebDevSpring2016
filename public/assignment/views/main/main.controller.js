(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);
    function MainController($scope) {
        $scope.Hello = "Hello from MainController"
    }
})();