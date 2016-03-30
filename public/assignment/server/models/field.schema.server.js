/**
 * Created by ravit on 3/29/2016.
 */
module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        "label": String,
        "fieldType": {type : String, enum: ["TEXT", "TEXTAREA", "DATE", "OPTIONS", "CHECKBOXES", "RADIOS"]},
        "placeholder": String,
        "options": [{label: String, value: String}]
    });

    return FieldSchema;
};