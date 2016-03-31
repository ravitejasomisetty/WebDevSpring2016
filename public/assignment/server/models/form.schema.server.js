/**
 * Created by ravit on 3/30/2016.
 */
"use strict";

module.exports = function(mongoose) {
    var FieldSchema = require('./field.schema.server.js')(mongoose);
    var FormSchema = mongoose.Schema({
        "userId": String,
        "title": String,
        "fields": [FieldSchema],
        "created":Date,
        "updated":Date
    }, {collection: "assignment.form"});

    return FormSchema;
};