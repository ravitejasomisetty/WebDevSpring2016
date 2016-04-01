(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($rootScope,$location,UserService) {
        var vm=this;
        vm.$location=$location;
        vm.logout=function (){
            UserService.logout()
                .then(function(res){
                    $rootScope.user=null;
                });
        }
    }
})();