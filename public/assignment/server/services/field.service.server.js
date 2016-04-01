"use strict";
module.exports = function (app, formModel, fieldModel) {
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/form/:formId/fields", updateFieldsOrder);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteField(fieldId)
            .then(function (deletedField) {
                    formModel.deleteFieldFromForm(formId, fieldId)
                        .then(function (form) {
                            res.json(form.fields);
                        }, function (err) {
                            res.status(400).send(err);
                        });
                }
                , function (err) {
                    res.status(400).send(err);
                });
    }

    function getFieldsForForm(req, res) {
        formModel.FindById(req.params.formId)
            .then(function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }

    function getFieldForForm(req, res) {
        fieldModel.FindField(req.params.formId, req.params.fieldId)
            .then(function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }

    function createFieldForForm(req, res) {
        fieldModel.createField(req.params.formId, req.body)
            .then(function (updatedFields) {
                    res.json(updatedFields);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateField(fieldId, field)
            .then(function (updatedField) {
                    formModel.updateFieldForForm(formId, updatedField)
                        .then(function (form) {
                            res.json(form.fields);
                        }, function (err) {
                            res.status(400).send(err);
                        });
                }
                , function (err) {
                    res.status(400).send(err);
                });
    }

    function updateFieldsOrder(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        formModel.updateFieldsOrder(formId, fields)
            .then(function (updatedFields) {
                res.json(updatedFields);
            }, function (err) {
                res.status(400).send(err);
            });

    }
}