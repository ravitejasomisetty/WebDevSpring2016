(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController(FormService,$scope,$rootScope){
        console.log("controller");
        $scope.addForm= function (form){
            console.log("AddForm");
            FormService.createFormForUser($rootScope.user._id,form,function(newForm){
                $scope.forms.push(newForm);
                console.log("AddForm callback");
            })
        }
        function updateForm(){}
        function deleteForm(){}
        function selectForm(){}
    }
})();