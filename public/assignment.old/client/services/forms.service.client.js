(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        function createFormForUser(userId, form) {
            var forms = $http.post("/api/assignment/user/" + userId + "/form", form);
            return forms;
        }

        function findAllFormsForUser(userId) {
            var forms = $http.get("/api/assignment/user/" + userId + "/form");
            return forms;
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            var updatedForm = $http.put("/api/assignment/form/" + formId, newForm);
            return updatedForm;
        }

        return {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
    }
})();