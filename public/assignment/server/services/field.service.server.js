/**
 * Created by ravit on 3/17/2016.
 */
"use strict";
module.exports = function (app, model) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldByFormId);

    var findFieldsByFormId=function(req,res){
        var formId=req.params.formId;
        var form=model.FindById(formId);
        res.send(form.fields);
    }

    var findFieldByFormId=function(req,res){
        var formId=req.params.formId;
        var fieldId=req.params.fieldId;
        var form=model.FindById(formId);
        var fields=form.fields;
        for(var i=0;i<fields.length;i++){
            if(fields[i]._id==fieldId)
            return fields[i];
        }
        return null;
    }

    var deleteFieldByFormId=function(req,res){
        var fieldId=req.params.fieldId;
        var formId=req.params.formId;
        var form=model.FindById(formId);
        var fields=form.fields;
        var fieldsCopy=form.fields;
        for(var i=0;i<fields.length;i++){
            if(fields[i]._id==fieldId)
            fieldsCopy.splice(i,1);
        }
        form.fields=fieldsCopy;
        model.Update(form._id,form);
        res.send(form);
    }

    var createFieldForForm=function(req,res){
        var formId=req.params.formId;
        var form=model.FindById(formId);
        var field=req.body.field;
        form.fields.push(field);
        model.Update(form._id,form);
        res.send(form);
    }

    var updateFieldByFormId=function(req,res){
        var formId=req.params.formId;
        var fieldId=req.params.fieldId;
        var field=req.body.field;
        var form=model.FindById(formId);
        var fields=form.fields;
        for(var i=0;i<fields.length;i++){
            if(fields[i]._id==fieldId) {
                fields[i]._id = field.id;
                fields[i].label=field.label;
                fields[i].type=field.type;
                fields[i].placeholder=field.placeholder;
            }
        }
        form.fields=fields;
        model.Update(form._id,form);
        res.send(form);
    }
};