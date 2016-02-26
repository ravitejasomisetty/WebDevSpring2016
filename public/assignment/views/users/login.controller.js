(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, UserService, $location, $rootScope) {
        $scope.login = function () {
            UserService.findUserByCredentials($scope.user.username, $scope.user.password, function (res) {
                if (res) {
                    $rootScope.user=res;
                    $location.url("/profile");
                }
                else {
                    console.log("User not found");
                }
            });
        };
    }
})();

