(function () {
    angular
        .module("GrabACar")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/renter", {
                templateUrl: "client/views/renter/renter.view.html",
                controller: "RenterController",
                controllerAs: "model"
            })
            .when("/crudvehicle", {
                templateUrl: "client/views/vehicle/crud.vehicle.view.html",
                controller: "CRUDVehicleController",
                controllerAs: "model"
            })
            .when("/vehicle", {
                templateUrl: "client/views/vehicle/vehicle.view.html",
                controller: "VehicleController",
                controllerAs: "model"
            })
            .when("/reservation", {
                templateUrl: "client/views/reservation/reservation.view.html",
                controller: "ReservationController",
                controllerAs: "model"
            })
            .when("/teller", {
                templateUrl: "client/views/teller/teller.view.html",
                controller: "TellerController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "client/views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
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
            .when("/rent", {
                templateUrl: "client/views/rent/rent.view.html",
                controller: "RentController",
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
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile/:renterId", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/myReservations/:rentid", {
                templateUrl: "client/views/users/myreservations.view.html",
                controller: "MyReservationsController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/admin/:searchRenterName", {
                templateUrl: "client/views/users/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkTellerLoggedIn: checkTellerLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "client/views/users/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkTellerLoggedIn: checkTellerLoggedIn
                }
            })
            .when("/approverents", {
                templateUrl: "client/views/users/approverents.view.html",
                controller: "ApproveRentsController",
                controllerAs: "model",
                resolve: {
                    checkTellerLoggedIn: checkTellerLoggedIn
                }
            })
            .when("/telleraccount/:id", {
                templateUrl: "client/views/users/telleraccount.view.html",
                controller: "TellerAccountController",
                controllerAs: "model",
                resolve: {
                    checkTellerLoggedIn: checkTellerLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/search"
            })
    }

    function getLoggedIn(RenterService, $q) {
        var deferred = $q.defer();

        RenterService
            .getCurrentUser()
            .then(function (response) {
                var currentUser = response.data;
                RenterService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(RenterService, $q, $location) {

        var deferred = $q.defer();

        RenterService
            .getCurrentUser()
            .then(function (response) {
                var currentUser = response.data;
                if (currentUser) {
                    RenterService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            });

        return deferred.promise;
    }

    function checkTellerLoggedIn(TellerService, $q, $location) {

        var deferred = $q.defer();

        TellerService
            .getCurrentUser()
            .then(function (response) {
                var currentUser = response.data;
                if (currentUser) {
                    TellerService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            });

        return deferred.promise;
    }
})();