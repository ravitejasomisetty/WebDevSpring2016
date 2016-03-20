"use strict";
module.exports = function (app, formModel, fieldModel) {
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var form = formModel.FindById(req.params.formId);
        console.log("Service server:"+form);
        res.json(form.fields);
    }

    function createFieldForForm(req, res) {
        var form = formModel.FindById(req.params.formId);
        var updatedForms = fieldModel.createField(form, req.body);
        res.json(updatedForms);
    }
}