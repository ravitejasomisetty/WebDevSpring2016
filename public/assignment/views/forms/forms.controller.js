(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController(FormService, $scope, $rootScope) {
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
                console.log("Updated successfully" + res);
                $scope.form.title = null;
                $scope.form._id = null;
            })
        }

        $scope.deleteForm = function (index) {
            $scope.forms.splice(index, 1);
        }

        $scope.selectForm = function (index) {
            $scope.form = {
                "title": $scope.forms[index].title,
                "_id": $scope.forms[index]._id
            };
        }
    }
})();