(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService () {
        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var findUserByCredentials = function (username, password, callback) {
            for (var user in users) {
                if (user.username == username && user.password == password)
                    callback(user);
                else
                    callback(null);
            }
        };

        var findAllUsers = function (callback) {
            callback(users);
        };

        var createUser = function (user, callback) {
            user._id = (new Date).getTime();
            users.add(user);
            callback(user);
        };

        var deleteUserById = function (userId, callback) {
            for (var user in users) {
                if (user._id == userId) {
                    users.remove(user);
                    callback(users);
                }
            }
        };

        var updateUser = function (userId, user, callback) {
            for (var u in users) {
                if (userId == u._id) {
                    u = user;
                    callback(u);
                }
            }
        };
        return {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        }
    }
})();