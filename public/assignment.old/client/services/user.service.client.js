(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($rootScope, $http) {
        $rootScope.user = null;

        function findUserByCredentials(username, password) {
            var user = $http.get("/api/assignment/user?username=" + username + "&password=" + password);
            return user;
        };

        var findAllUsers = function () {
            var users = $http.get("/api/assignment/user");
            return users;
        };

        var createUser = function (user) {
            user._id = (new Date).getTime();
            var user = $http.post("/api/assignment/user", user);
            return user;
        };

        var deleteUserById = function (userId) {
            $http.delete("/api/assignment/user/" + userId);
        };

        var updateUser = function (userId, user) {
            var user = $http.put("/api/assignment/user/" + userId, user);
            return user;
        };

        var findUserByUsername = function (username) {
            var user = $http.get("/api/assignment/user?username=" + username);
            return user;
        }

        return {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        }
    }
})();