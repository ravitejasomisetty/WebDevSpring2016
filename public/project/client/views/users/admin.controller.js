(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("AdminController", AdminController);
    function AdminController(UserService) {
        var vm=this;
        vm.users= UserService.findAllUsers();
            //.then(function(res){
            //    vm.users=res.data;
            //});

        vm.approve=function(user){
            user.status="Approved";
            user.approved=true;
            user.declined=false;
            vm.users=updateNewRenter(user);
        }

        function updateNewRenter(user){
            for(var i=0;i<vm.users.length;i++)
            {
                if(vm.users[i]._id==user._id)
                {
                    vm.users[i]=user;
                    return vm.users;
                }
            }
            return null;
        }

        vm.decline=function(user){
            user.status="Declined";
            user.declined=true;
            user.approved=false;
            vm.users=updateNewRenter(user);
        }
    }
})();