/**
 * Created by ravit on 3/22/2016.
 */


module.exports = function (uuid) {
    var renters = [
        {
            "_id": 123, "firstName": "Alice","lastName": "Wonderland", "nationality": "Indian",
            "city": "Boston", "mobilenumber": "999999999", "birthdate": new Date("6/8/1992"),
            "rentername": "alice", "password": "alice", "email": "alicewonderland@gmail.com","roles":"admin",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Waiting for approval"
        },
        {
            "_id": 234, "firstName": "Bob","lastName":"Hope", "nationality": "American",
            "city": "Phoenix", "mobilenumber": "999999999", "birthdate": new Date("4/25/1992"),
            "rentername": "bob", "password": "bob", "email": "bobhope@gmail.com",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Waiting for approval"
        },
        {
            "_id": 345, "firstName": "Charlie","lastName":"Brown", "nationality": "African",
            "city": "New Jersey", "mobilenumber": "999999999", "birthdate": new Date("7/6/1992"),
            "rentername": "charlie", "password": "charlie", "email": "charliebrown@gmail.com","roles":"admin",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status":"Approved"
        },
        {
            "_id": 456, "firstName": "Dan","lastName":"Craig", "nationality": "African",
            "city": "San Diego", "mobilenumber": "999999999", "birthdate": new Date("2/22/1992"),
            "rentername": "dan", "password": "dan", "email": "dancraig@gmail.com",
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
        findRenterByRentername: findRenterByRentername,
        findRenterByCredentials: findRenterByCredentials,
        isYoungDriver:isYoungDriver
    };
    return api;

    function isYoungDriver(renterId){
        for(var i=0;i<renters.length;i++)
        {
            if(renterId==renters[i]._id){
                var age=_calculateAge(renters[i].birthdate);
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

    function Create(renter) {
        renter._id = uuid.v1();
        if (renters) {
            renters.push(renter);
        }
        else renters = [renter];
        return renters;
    }

    function FindAll() {
        return renters;
    }

    function FindById(id) {
        for (var i = 0; i < renters.length; i++) {
            if (renters[i]._id == id)
                return renters[i];
        }
        return null;
    }

    function Update(id, renter) {
        for (var i = 0; i < renters.length; i++) {
            if (renters[i]._id == id) {
                renters[i].firstName = renter.firstName;
                renters[i].lastName = renter.lastName;
                renters[i].rentername = renter.rentername;
                renters[i].password = renter.password;
                renters[i].email = renter.email;
                renters[i].roles=renter.roles;
            }
        }
        return renters;
    }

    function Delete(id) {
        var rentersCopy = renters;
        for (var i = 0; i < rentersCopy.length; i++) {
            if (rentersCopy[i]._id == id) {
                renters.splice(i, 1);
            }
        }
        return renters;
    }

    function findRenterByRentername(rentername) {
        for (var i = 0; i < renters.length; i++) {
            if (renters[i].rentername == rentername)
                return renters[i];
        }
        return null;
    }

    function findRenterByCredentials(credentials) {
        for (var i = 0; i < renters.length; i++) {
            if (renters[i].rentername == credentials.rentername && renters[i].password == credentials.password)
                return renters[i];
        }
        return null;
    }
};