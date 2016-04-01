"use strict";
module.exports = function (mongoose, db, uuid) {
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model("FrmModel", FormSchema);
    var FieldSchema = require('./field.schema.server.js')(mongoose);
    var FieldModel = mongoose.model("FieldModel", FieldSchema);
    var q = require("q");

    function createField(formId, field) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                FieldModel.create(field, function (err, newField) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            form.fields.push(newField);
                            form.save(function (err, form) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    // resolve promise with user
                                    deferred.resolve(form.fields);
                                }
                            })
                        }
                    }
                );
            }
        });
        return deferred.promise;
    }

    function FindField(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id == fieldId) {
                        FieldModel.findById(fieldId, function (err, field) {
                            if (err)
                                deferred.reject(err);
                            else {
                                deferred.resolve(field);
                            }
                        })
                    }
                }
            }
        });
        return deferred.promise;
    }

    function updateField(fieldId, field) {
        var deferred = q.defer();
        // find the user
        FieldModel.findById(fieldId, function (err, currentField) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                currentField.label = field.label;
                currentField.options=field.options;
                currentField.placeholder=field.placeholder;
                currentField.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteField(fieldId){
        var deferred = q.defer();
        FormModel.remove({_id: fieldId}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    return {
        deleteField:deleteField,
        updateField: updateField,
        createField: createField,
        FindField: FindField
    }
}