(function () {
    angular
        .module("GrabACar")
        .controller("UserController", UserController);
    function UserController(UserService, $scope, $rootScope) {
        'use strict';
        var user = $rootScope.user;
        UserService.findAllUsers(function (users) {
            $scope.users = users;
        });
        $scope.addForm = function (user) {
            UserService.createUser(user, function (user) {
                $scope.users.push(user);
            })
        }
        $scope.updateForm = function (user) {
            UserService.updateUser(user, function (res) {
                console.log("updated successfully");
            })
        }

        $scope.deleteForm = function (index) {
            $scope.users.splice(index, 1);
        }

        $scope.selectForm = function (index) {
            $scope.user = {
                "email": $scope.users[index].email,
                "id": $scope.users[index].id,
                "fullName": $scope.users[index].fullName,
                "nationality": $scope.users[index].nationality,
                "city": $scope.users[index].city,
                "mobilenumber": $scope.users[index].mobilenumber,
                "birthdate": $scope.users[index].birthdate,
                "username": $scope.users[index].username,
                "password": $scope.users[index].password
            };
        }
    }
})();