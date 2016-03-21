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
        findFormByTitle: findFormByTitle,
        updateField:updateField,
        createField:createField,
        deleteFieldFromForm:deleteFieldFromForm
    }

    return api;

    function deleteFieldFromForm(formId,fieldId){
        for(var i=0;i<forms.length;i++){
            if(forms[i]._id==formId){
                var fields=forms[i].fields;
                var fieldsCopy=fields;
                for(var j=0;j<fields.length;j++)
                {
                    if(fields[j]._id==fieldId)
                    {
                        fieldsCopy.splice(j,1);
                        return fieldsCopy;
                    }
                }
            }
        }
        return null;
    }

    function createField(formId, field) {
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i]._id==formId)
            {
                forms[i].fields.push(field);
                return forms[i].fields;
            }
        }
        return null;
    }

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

    function FindAll() {
        return forms;
    }

    function FindById(id) {
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

    function updateField(formId,fieldId,field){
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i]._id==formId)
            {
                var fields=forms[i].fields;
                for(var j=0;j<fields.length;j++)
                {

                    if(fields[j]._id==fieldId)
                    {
                        fields[j]=field;
                        return fields;
                    }
                }
            }
        }
        return null;
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