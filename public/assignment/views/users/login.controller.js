(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope,UserService,$location,$rootScope) {
                $scope.login = function(){
                            UserService.findUserByCredentials($scope.user.username,$scope.user.password,function(res){
                            if(res != undefined)
                            {

                             $location.url("#/profile");
                            }


                                console.log("username found");

                            });
                        };


        }
})();

