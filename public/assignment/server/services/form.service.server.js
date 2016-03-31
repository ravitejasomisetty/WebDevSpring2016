"use strict";
module.exports = function (app, model) {
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function findAllFormsForUser(req, res) {
        model.FindByUserId(req.params.userId)
            .then(function (forms) {
                    res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        model.Create(form, userId)
            .then(function (forms) {
                    res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findFormById(req, res) {
        model.FindById(req.params.formId)
            .then(function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateForm(req, res) {
        model.Update(req.params.formId, req.body)
            .then(function (updatedForm) {
                    res.json(updatedForm);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }

    function deleteFormById(req, res) {
        model.Delete(req.params.formId)
            .then(function (status) {
                    res.json(status)
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};