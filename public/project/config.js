
var app=angular.module('GrabACar', ['ngRoute']);

app.config(function($routeProvider){
            $routeProvider
                .when("/users", {
                    templateUrl: "client/views/forms/users.view.html",
                    controller:"UserController"
                })

                .otherwise({
                    redirectTo: "/users"
                });
        });