(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$location,$rootScope,UserService) {
       $scope.user.firstName=$rootScope.user.firstName;
        $scope.user.lastName=$rootScope.user.lastName;
        $scope.user.username=$rootScope.user.username;
        $scope.user.password=$rootScope.user.password;

        $scope.update=function(){
            UserService.updateUser($rootScope.user._id,$rootScope.user,function(res){
                console.log("updated url");
            });
        };
    }
})();




