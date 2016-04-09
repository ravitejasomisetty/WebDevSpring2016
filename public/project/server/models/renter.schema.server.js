/**
 * Created by ravit on 4/6/2016.
 */
module.exports = function (mongoose) {
    var RenterSchema = mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "nationality": String,
        "city": String,
        "mobilenumber": String,
        "birthdate": Date,
        "rentername": String,
        "password": String,
        "email": String,
        "roles": String,
        "licenseNumber": String,
        "licenseCountry": String,
        "status": String,
        "reservations": [String]
    }, {collection: "grabacar.renter"});

    return RenterSchema;
};