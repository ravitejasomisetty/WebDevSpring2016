(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($rootScope) {
        $rootScope.user = null;
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
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password)
                    return callback(users[i]);
            }
            callback(null);
        };

        var findAllUsers = function (callback) {
            callback(users);
        };

        var createUser = function (user, callback) {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user);
        };

        var deleteUserById = function (userId, callback) {
            var usersCopy=users;
            for (var i = 0; i < usersCopy.length; i++) {
                if (usersCopy[i]._id == userId) {
                    users.splice(i,1);
                    callback(users);
                }
            }
        };

        var updateUser = function (userId, user, callback) {
            for (var i = 0; i < users.length; i++) {
                if (userId == users[i]._id) {
                    users[i] = user;
                    return callback(users[i]);
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