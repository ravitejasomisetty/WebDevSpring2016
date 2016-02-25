(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope,UserService,$location,$rootScope) {

        $scope.register=function(){
            $scope.user.firstname="";
            $scope.user.lastname="";
            $scope.user.roles="";
            UserService.createUser($scope.user,function(res){
                $rootScope.user=res;
            });
            $location.url("/profile");
        };
    }
})();

