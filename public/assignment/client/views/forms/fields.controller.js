(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController(FieldService,$routeParams) {
        var userId=$routeParams.userId;
        var formId=$routeParams.formId;
        var fields=FieldService.getFieldsForForm(formId);
    }
})();
