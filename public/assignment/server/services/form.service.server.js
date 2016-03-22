"use strict";
module.exports = function (app, model) {
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function findAllFormsForUser(req, res) {
        var forms = model.FindByUserId(req.params.userId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form.userId = userId;
        form._id = null;
        var forms = model.Create(form);
        res.json(forms);
    }

    function findFormById(req, res) {
        var form = model.FindById(req.params.formId);
        res.json(form);
    }

    function updateForm(req, res) {
        var forms=model.Update(req.params.formId, req.body);
        res.json(forms);
    }

    function deleteFormById(req, res) {
        var forms=model.Delete(req.params.formId);
        res.json(forms);
    }
};