(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController(FormService, $scope, $rootScope) {
        'use strict';
        var user = $rootScope.user;
        FormService.findAllFormsForUser(user._id)
            .then(function (userForms) {
                $scope.forms = userForms.data;
            });
        $scope.addForm = function (form) {
            if (form) {
                form.userId = $rootScope.user._id;
                FormService.createFormForUser($rootScope.user._id, form)
                    .then(function (newForm) {
                        FormService.findAllFormsForUser(user._id)
                            .then(function (userForms) {
                                $scope.forms = userForms.data;
                                $scope.form = null;
                            });
                    })
            }
        }
        $scope.updateForm = function (updatedForm) {
            if (updatedForm) {
                FormService.updateFormById(updatedForm._id, updatedForm)
                    .then(function (res) {
                        FormService.findAllFormsForUser(user._id)
                            .then(function (userForms) {
                                $scope.forms = userForms.data;
                                $scope.form = null;
                            });
                    })
            }
        }

        $scope.deleteForm = function (form) {
            FormService.deleteFormById(form._id)
                .then(function (res) {
                    FormService.findAllFormsForUser(user._id)
                        .then(function (userForms) {
                            $scope.forms = userForms.data;
                        });
                });
        }

        $scope.selectForm = function (index) {
            $scope.form = {
                "title": $scope.forms[index].title,
                "_id": $scope.forms[index]._id
            };
        }
    }
})();