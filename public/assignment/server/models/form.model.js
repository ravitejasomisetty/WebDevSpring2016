"use strict";
module.exports = function (mongoose, db, uuid) {
    var forms = require("./form.mock.json");
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var q = require("q");
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        FindByUserId: FindByUserId,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        updateField: updateField,
        createField: createField,
        deleteFieldFromForm: deleteFieldFromForm,
        updateFieldsOrder: updateFieldsOrder,
        FindField: FindField
    }

    return api;

    function FindField(formId, fieldId) {
        var field;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j]._id == fieldId) {
                        field = fields[j];
                    }
                }
            }
        }
        return field;
    }

    function updateFieldsOrder(formId, fields) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms[i].fields = fields;
                return forms[i].fields;
            }
        }
        return null;
    }

    function deleteFieldFromForm(formId, fieldId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                var fields = forms[i].fields;
                var fieldsCopy = fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j]._id == fieldId) {
                        fieldsCopy.splice(j, 1);
                        return fieldsCopy;
                    }
                }
            }
        }
        return null;
    }

    function createField(formId, field) {
        field._id = uuid.v1();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                if (forms[i].fields) {
                    forms[i].fields.push(field);
                }
                else {
                    forms[i].fields = [field];
                }
                return forms[i].fields;
            }
        }
        return null;
    }

    function FindByUserId(userId) {
        var deferred = q.defer();
        FormModel.find({"userId": userId}, function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function Create(form, userId) {
        var deferred = q.defer();
        form.userId = userId;
        form.fields = [];
        form.created = Date.now();
        form.updated = Date.now();
        FormModel.create(form, function (err, newForm) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newForm);
            }
        });
        return deferred.promise;
    }

    function FindAll() {
        return forms;
    }

    function FindById(id) {
        var deferred = q.defer();
        FormModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Update(id, form) {
        var deferred = q.defer();

        // find the user
        FormModel.findById(id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.title = form.title;
                // save user
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == id) {
                forms[i].title = form.title;
                //forms[i].userId = form.userId;
                //forms[i].fields = form.fields;
            }
        }
        return forms;
    }

    function updateField(formId, fieldId, field) {
        var fields;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j]._id == fieldId) {
                        fields[j] = field;
                        break;
                    }
                }
            }
        }
        return fields;
    }

    function Delete(id) {
        var deferred = q.defer();
        FormModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title)
                return forms[i];
        }
        return null;
    }
};