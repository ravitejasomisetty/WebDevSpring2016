(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
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
            var forms=$http.put("/api/assignment/form/" + formId, newForm);
            return forms;
        }

        return {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
    }
})();