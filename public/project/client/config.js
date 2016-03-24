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
            controller: "SearchController",
            controllerAs: "model"
        })
        .when("/details/:HWRefNumber", {
            templateUrl: "client/views/forms/details.view.html",
            controller: "DetailsController",
            controllerAs: "model"
        })

        .when("/register", {
            templateUrl: "client/views/users/register.view.html",
            controller: "RegisterController",
            controllerAs: "model"
        })
        .when("/vehicle", {
            templateUrl: "client/views/vehicle/vehicle.view.html",
            controller: "VehicleController",
            controllerAs: "model"
        })
        .when("/rent", {
            templateUrl: "client/views/rent/rent.view.html",
            controller: "RentController",
            controllerAs: "model"
        })
        .when("/teller", {
            templateUrl: "client/views/teller/teller.view.html",
            controller: "TellerController",
            controllerAs: "model"
        })
        .when("/reservation", {
            templateUrl: "client/views/reservation/reservation.view.html",
            controller: "ReservationController",
            controllerAs: "model"
        })
        .when("/vlocation", {
            templateUrl: "client/views/vlocation/vlocation.view.html",
            controller: "VLocationController",
            controllerAs: "model"
        })
        .when("/location", {
            templateUrl: "client/views/location/location.view.html",
            controller: "LocationController",
            controllerAs: "model"
        })
        .when("/renter", {
            templateUrl: "client/views/renter/renter.view.html",
            controller: "RenterController",
            controllerAs: "model"
        })
        .when("/login", {
            templateUrl: "client/views/users/login.view.html",
            controller: "LoginController",
            controllerAs: "model"
        })
        .when("/profile", {
            templateUrl: "client/views/users/profile.view.html",
            controller: "ProfileController",
            controllerAs: "model"
        })
        .when("/myReservations", {
            templateUrl: "client/views/users/myreservations.view.html",
            controller: "MyReservationsController"
        })
        .when("/admin", {
            templateUrl: "client/views/users/admin.view.html",
            controller: "AdminController",
            controllerAs: "model"
        })
        .otherwise({
            redirectTo: "/search"
        });
});