/**
 * Created by ravit on 4/8/2016.
 */
module.exports = function (mongoose) {
    var VehicleSchema = mongoose.Schema({
        "brand": String,
        "CarTypeCode": String,
        "MileageDescription": String,
        "platenumber": String,
        "seatquantity": String,
        "fueltype": String,
        "condition": Date,
        "DailyRate": String,
        "location": String
    }, {collection: "grabacar.vehicle"});

    return VehicleSchema;
};