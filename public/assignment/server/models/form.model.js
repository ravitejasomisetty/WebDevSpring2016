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
        deleteFieldFromForm: deleteFieldFromForm,
        updateFieldsOrder: updateFieldsOrder,
        updateFieldForForm: updateFieldForForm
    }

    return api;

    function updateFieldForForm(formId, field) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                for (var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id.equals(field._id)) {
                        form.fields[i].label = field.label;
                        form.fields[i].placeholder = field.placeholder;
                        form.fields[i].options = field.options;
                        form.save(function (err, doc) {

                            if (err) {
                                deferred.reject(err);
                            } else {

                                // resolve promise with form
                                deferred.resolve(doc);
                            }
                        });
                    }
                }
            }
        });
        return deferred.promise;
    }

    function updateFieldsOrder(formId, fields) {
        var deferred = q.defer();

        // find the user
        FormModel.findById(formId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.fields = fields;
                // save user
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve(doc.fields);
                    }
                });
            }});
        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                for (var j = 0; j < form.fields.length; j++) {
                    if (form.fields[j]._id.equals(fieldId)) {
                        form.fields.splice(j, 1);
                        form.save(function (err, doc) {

                            if (err) {
                                deferred.reject(err);
                            } else {

                                // resolve promise with form
                                deferred.resolve(doc);
                            }
                        });
                    }
                }
            }}
       );
        return deferred.promise;
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
        var deferred = q.defer();
        FormModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
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

    function Delete(id) {
        var deferred = q.defer();
        FormModel.remove({_id: id}, function (err, status) {
            if (err) {
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