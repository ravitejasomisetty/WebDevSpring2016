/**
 * Created by ravit on 3/22/2016.
 */


module.exports = function (uuid) {
    var users = [
        {
            "_id": 123, "firstName": "Alice","lastName": "Wonderland", "nationality": "Indian",
            "city": "Boston", "mobilenumber": "999999999", "birthdate": new Date("6/8/1992"),
            "username": "alice", "password": "alice", "email": "alicewonderland@gmail.com","roles":"admin",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Waiting for approval"
        },
        {
            "_id": 234, "firstName": "Bob","lastName":"Hope", "nationality": "American",
            "city": "Phoenix", "mobilenumber": "999999999", "birthdate": new Date("4/25/1992"),
            "username": "bob", "password": "bob", "email": "bobhope@gmail.com",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Waiting for approval"
        },
        {
            "_id": 345, "firstName": "Charlie","lastName":"Brown", "nationality": "African",
            "city": "New Jersey", "mobilenumber": "999999999", "birthdate": new Date("7/6/1992"),
            "username": "charlie", "password": "charlie", "email": "charliebrown@gmail.com","roles":"admin",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Approved"
        },
        {
            "_id": 456, "firstName": "Dan","lastName":"Craig", "nationality": "African",
            "city": "San Diego", "mobilenumber": "999999999", "birthdate": new Date("2/22/1992"),
            "username": "dan", "password": "dan", "email": "dancraig@gmail.com",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Declined"
        }
    ];
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        isYoungDriver:isYoungDriver
    };
    return api;

    function isYoungDriver(userId){
        for(var i=0;i<users.length;i++)
        {
            if(userId==users[i]._id){
                var age=_calculateAge(users[i].birthdate);
                if(15<=age && age<=18)
                {
                    return true;
                }
            }
        }
        return false;
    }

    function _calculateAge(birthdate) {
        var ageDifMs = Date.now() - birthdate.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function Create(user) {
        user._id = uuid.v1();
        if (users) {
            users.push(user);
        }
        else users = [user];
        return users;
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
                users[i].roles=user.roles;
            }
        }
        return users;
    }

    function Delete(id) {
        var usersCopy = users;
        for (var i = 0; i < usersCopy.length; i++) {
            if (usersCopy[i]._id == id) {
                users.splice(i, 1);
            }
        }
        return users;
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