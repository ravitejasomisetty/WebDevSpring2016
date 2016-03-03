
var app=angular.module('GrabACar', ['ngRoute']);

app.config(function($routeProvider){
            $routeProvider
                .when("/users", {
                    templateUrl: "client/views/forms/users.view.html",
                    controller:"UserController"
                })
                .when("/vehicles", {
                    templateUrl: "client/views/forms/vehicles.view.html",
                    controller:"VehicleController"
                })
                .when("/reservations", {
                    templateUrl: "client/views/forms/reservations.view.html",
                    controller:"ReservationController"
                })
                .when("/tellers", {
                    templateUrl: "client/views/forms/teller.view.html",
                    controller:"TellerController"
                })
                .when("/search", {
                    templateUrl: "client/views/forms/search.view.html",
                    controller:"SearchController"
                })
                .otherwise({
                    redirectTo: "/users"
                });
        });