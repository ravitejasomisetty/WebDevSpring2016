var app = angular.module('GrabACar', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/users", {
            templateUrl: "client/views/forms/users.view.html",
            controller: "UserController"
        })
        .when("/vehicles", {
            templateUrl: "client/views/forms/vehicles.view.html",
            controller: "VehicleController"
        })
        .when("/reservations", {
            templateUrl: "client/views/forms/reservations.view.html",
            controller: "ReservationController"
        })
        .when("/tellers", {
            templateUrl: "client/views/forms/teller.view.html",
            controller: "TellerController"
        })
        .when("/search", {
            templateUrl: "client/views/forms/search.view.html",
            controller: "SearchController"
        })
        .when("/details/:HWRefNumber", {
            templateUrl: "client/views/forms/details.view.html",
            controller: "DetailsController"
        })

        .when("/register", {
            templateUrl: "client/views/users/register.view.html",
            controller: "RegisterController"
        })
        .when("/login", {
            templateUrl: "client/views/users/login.view.html",
            controller: "LoginController"
        })
        .when("/profile", {
            templateUrl: "client/views/users/profile.view.html",
            controller: "ProfileController"
        }).when("/myReservations", {
            templateUrl: "client/views/users/myreservations.view.html",
            controller: "MyReservationsController"
        })
        .otherwise({
            redirectTo: "/search"
        });
});