"use strict";
module.exports = function (app) {
    var forms = require("./form.mock.json");
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        FindByUserId: FindByUserId,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle
    }

    return api;

    function FindByUserId(userId) {
        var userForms = [];
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].userId == userId)
                userForms.push(forms[i]);
        }
        return userForms;
    }

    function Create(form) {
        forms.push(form);
        return forms;
    }

    var FindAll = function FindAll() {
        return forms;
    }

    var FindById = function (id) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == id)
                return forms[i];
        }
        return null;
    }

    function Update(id, form) {
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
        var formsCopy = forms;
        for (var i = 0; i < formsCopy.length; i++) {
            if (formsCopy[i]._id == id) {
                forms.splice(i, 1);
            }
        }
        return forms;
    }

    function findFormByTitle(title) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title)
                return forms[i];
        }
        return null;
    }
};