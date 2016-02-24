(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];

        function createFormForUser(userId, form, callback) {
            var newForm = {"_id": (new Date).getTime(), "title": form.name, "userId": userId};
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            for (i = 0; i < forms.length; i++) {
                if (forms[i].userId == userId)
                    callback(forms[i]);
            }
            callback([]);
        }

        function deleteFormById(formId, callback) {
            for (i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId)
                    forms.splice(i, 1);
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms[i].title = newForm.name;
                    forms[i].userId = newForm.userId;
                }
            }
            callback(newForm);
        }

        return{
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }
    }
})();