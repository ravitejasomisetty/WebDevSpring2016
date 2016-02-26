(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController(FormService, $scope, $rootScope) {
        var user={"userId":"123"};
        FormService.findAllFormsForUser(user.userId,function(userForms)
        {
            $scope.forms=userForms;
        });
        $scope.addForm = function (form) {
            FormService.createFormForUser($rootScope.user._id, form, function (newForm) {
                $scope.forms.push(newForm);
            })
        }
        function updateForm(updatedForm) {
            console.log("updating");
            var currentIndex = $scope.selectedIndex;
            var form = $scope.forms[currentIndex];
            FormService.updateFormById(form._id, updatedForm, function (res) {
                console.log(res);
            })
        }

        function deleteForm() {
        }

        function selectForm() {
        }
    }
})();