var users = require("./user.mock.json");
module.exports = function () {
    var api= {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function Create(user) {
        users.push(user);
        return user;
    }

    function FindAll() {
        return users;
    }

    function FindById(id) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id)
                return users[i];
        }
        return null;
    }

    function Update(id, user) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].username = user.username;
                users[i].password = user.password;
                users[i].email = user.email;
            }
        }
    }

    function Delete(id) {
        var usersCopy = users;
        for (var i = 0; i < usersCopy.length; i++) {
            if (usersCopy[i]._id == userId) {
                users.splice(i, 1);
            }
        }
    }

    function findUserByUsername(username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username)
                return users[i];
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password)
                return users[i];
        }
        return null;
    }
};