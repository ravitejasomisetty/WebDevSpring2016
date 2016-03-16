"use strict";
module.exports = function (app) {
    var forms = require("form.mock.json");
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle
    }

    return api;

    var Create = function (form) {
        forms.push(form);
        return forms;
    }

    var FindAll = function () {
        return forms;
    }

    var FindById = function (id) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == id)
                return forms[i];
        }
        return null;
    }

    var Update = function (id, form) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == id) {
                forms[i].firstName = form.firstName;
                forms[i].lastName = form.lastName;
                forms[i].formname = form.formname;
                forms[i].password = form.password;
            }
        }
    }

    var Delete = function (id) {
        var formsCopy = forms;
        for (var i = 0; i < formsCopy.length; i++) {
            if (formsCopy[i]._id == formId) {
                forms.splice(i, 1);
            }
        }
    }

    var findFormByTitle = function (title) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title)
                return forms[i];
        }
        return null;
    }
};