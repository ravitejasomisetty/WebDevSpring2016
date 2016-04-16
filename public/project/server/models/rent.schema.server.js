/**
 * Created by ravit on 4/8/2016.
 */
module.exports = function (mongoose) {
    var TellerSchema=require("./teller.schema.server.js")(mongoose);
    var RentSchema = mongoose.Schema({
        "platenumber": String,
        "rentdate": Date,
        "returndate": Date,
        "totalrentday": String,
        "dailyrentfee": String,
        "pickuptime": String,
        "returntime": String,
        "carimage": String,
        "subtotal": String,
        "taxesandfees": String,
        "totalprice": String,
        "cartypecode": String,
        "locationdescription": String,
        "mileagedescription": String,
        "pickupairport": String,
        "fuelprovidedby": String,
        "fuelcharge": String,
        "downpayment": String,
        "totalpaid": String,
        "refund": String,
        "status": String,
        "renterid": String,
        "employeeid": String,
        "updatedby":[TellerSchema]
    }, {collection: "grabacar.rent"});

    return RentSchema;
};