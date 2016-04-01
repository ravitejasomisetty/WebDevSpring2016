(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($location) {
        var vm=this;
        vm.$location=$location;
    }
})();