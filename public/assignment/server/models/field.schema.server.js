/**
 * Created by ravit on 3/29/2016.
 */
module.exports = function (mongoose) {
    var FieldSchema = mongoose.Schema({
        "label": String,
        "type": {type: String, enum: ["TEXT", "TEXTAREA", "DATE", "OPTIONS", "CHECKBOXES", "RADIOS"]},
        "placeholder": String,
        "options": [{_id: false, label: String, value: String}]
    }, {collection: "assignment.fields"});

    return FieldSchema;
};