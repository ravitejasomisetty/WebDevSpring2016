(function(){
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,UserService,$location,$rootScope) {


       $scope.user.firstname=$rootScope.user.firstname;
        $scope.user.lastname=$rootScope.user.lastname;
        $scope.user.username=$rootScope.user.username;
        $scope.user.password=$rootScope.user.password;

        $scope.update=function(){
            UserService.updateUser($rootScope.user._id,$rootScope.user,function(res){

            });
        };
    }
})();

