(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($http) {

        function findUserByUsername(username) {
            var user = $http.get("/api/assignment/user?username=" + username);
            return user;
        }

        function findUserByCredentials(username, password,user) {
            var user = $http.get("/api/assignment/user?username=" + username + "&password=" + password);
            return user;
        };

        function findAllUsers() {
            var users = $http.get("/api/assignment/user");
            return users;
        };

        function createUser(user) {
            var users = $http.post("/api/assignment/user", user);
            return users;
        };

        function deleteUserById(userId) {
            var users=$http.delete("/api/assignment/user/" + userId);
            return users;
        };

        function updateUser(userId, user) {
            var users = $http.put("/api/assignment/user/" + userId, user);
            return users;
        };



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