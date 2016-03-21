"use strict";
module.exports = function (app, formModel) {
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);

    function deleteField(req,res){
        var formId=req.params.formId;
        var fieldId=req.params.fieldId;
        var fields=formModel.deleteFieldFromForm(formId,fieldId);
        res.json(fields);
    }

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var form = formModel.FindById(req.params.formId);
        res.json(form.fields);
    }

    function createFieldForForm(req, res) {
        var updatedFields = formModel.createField(req.params.formId, req.body);
        res.json(updatedFields);
    }

    function updateField(req,res){
        var formId=req.params.formId;
        var fieldId=req.params.fieldId;
        var field=req.body;
        var updatedFields=formModel.updateField(formId,fieldId,field);
        res.json(updatedFields);
    }
}