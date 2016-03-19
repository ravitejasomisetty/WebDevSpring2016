
var app=angular.module('FormBuilderApp', ['ngRoute']);

app.config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "client/views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/register", {
                    templateUrl: "client/views/users/register.view.html",
                    controller:"RegisterController"
                })
                .when("/login", {
                    templateUrl: "client/views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "client/views/users/profile.view.html",
                    controller:"ProfileController"
                })
                .when("/admin", {
                    templateUrl: "client/views/admin/admin.view.html",
                    controller:"AdminController"

                })
                .when("/forms", {
                    templateUrl: "client/views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/fields", {
                    templateUrl: "client/views/forms/fields.view.html",
                    controller:"FieldsController"
                })

                .otherwise({
                    redirectTo: "/home"
                });
        });