(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController(FormService, $scope, $rootScope) {
        var user = $rootScope.user;
        FormService.findAllFormsForUser(user._id, function (userForms) {
            $scope.forms = userForms;
        });
        $scope.addForm = function (form) {
            form.userId = $rootScope.user._id;
            FormService.createFormForUser($rootScope.user._id, form, function (newForm) {
                $scope.forms.push(newForm);
            })
        }
        $scope.updateForm = function (updatedForm) {
            FormService.updateFormById(updatedForm._id, updatedForm, function (res) {
                console.log("Updated successfully"+res);
            })
        }

        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.forms[index]._id, function (newForms) {
                $scope.forms = newForms;
            })
        }

        $scope.selectForm = function (index) {
            $scope.form = {
                "title": $scope.forms[index].title,
                "_id": $scope.forms[index]._id
            };
        }
    }
})();