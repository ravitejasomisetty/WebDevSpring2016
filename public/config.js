
var app=angular.module('FormBuilderApp', ['ngRoute']);

app.config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "assignment/views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/register", {
                    templateUrl: "assignment/views/users/register.view.html",
                    controller:"RegisterController"
                })
                .when("/login", {
                    templateUrl: "assignment/views/users/login.view.html"
                })
                .when("/profile", {
                    templateUrl: "assignment/views/users/profile.view.html",
                    controller:"ProfileController"
                })
                .when("/admin", {
                    templateUrl: "assignment/views/admin/admin.view.html"

                })
                .when("/forms", {
                    templateUrl: "assignment/views/forms/forms.view.html",
                    controller: "FormController"
                })

                .otherwise({
                    redirectTo: "/home"
                });
        });