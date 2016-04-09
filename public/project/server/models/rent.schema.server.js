/**
 * Created by ravit on 4/8/2016.
 */
module.exports = function (mongoose) {
    var RentSchema = mongoose.Schema({
        "platenumber": String,
        "rentdate": String,
        "returndate": String,
        "totalrentday": String,
        "dailyrentfee": String,
        "fuelprovidedby": Date,
        "fuelcharge": String,
        "downpayment": String,
        "totalpaid": String,
        "refund": String,
        "customerid": String,
        "employeeid": String
    }, {collection: "grabacar.rent"});

    return RentSchema;
};