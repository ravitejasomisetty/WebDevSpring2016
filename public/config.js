
var app=angular.module('FormBuilderApp', ['ngRoute']);

app.config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "assignment/views/home/home.view.html"
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
                    templateUrl: "assignment/views/users/admin.view.html"
                })
                .when("/forms", {
                    templateUrl: "assignment/views/forms/forms.view.html",
                    controller: "FormController"
                })

                .otherwise({
                    redirectTo: "assignment/views/users/home.view.html"
                });
        });