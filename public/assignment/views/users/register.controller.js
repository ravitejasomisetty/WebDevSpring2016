(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope,UserService,$location) {
        $scope.Hello = "Hello from RegisterController";

        $scope.register=function(){

            $scope.user.firstname=$scope.firstname;
            $scope.user.lastname=$scope.lastname;
            $scope.user.username=$scope.inputUsername;
            $scope.user.password=$scope.inputPassword;

            UserService.createUser($scope.user,function(res){
                $rootScope.user=res;
            });

        };
    }
})();

