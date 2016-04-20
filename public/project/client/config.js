(function () {
    angular
        .module("GrabACar")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/vehicle", {
                templateUrl: "client/views/vehicle/vehicle.view.html",
                controller: "VehicleController",
                controllerAs: "model",
                resolve: {checkTellerLoggedIn: checkTellerLoggedIn}
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
                templateUrl: "client/views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController",
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
                    getLoggedIn: getLoggedIn
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
                templateUrl: "client/views/users/approverenters.view.html",
                controller: "ApproveRentersController",
                controllerAs: "model",
                resolve: {
                    checkTellerLoggedIn: checkTellerLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "client/views/approverenters/approverenters.view.html",
                controller: "ApproveRentersController",
                controllerAs: "model",
                resolve: {
                    checkTellerLoggedIn: checkTellerLoggedIn
                }
            })
            .when("/approverents", {
                templateUrl: "client/views/approverents/approverents.view.html",
                controller: "ApproveRentsController",
                controllerAs: "model",
                resolve: {
                    checkTellerLoggedIn: checkTellerLoggedIn
                }
            })
            .when("/telleraccount/:id", {
                templateUrl: "client/views/teller/telleraccount.view.html",
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
                if (currentUser.rentername) {
                    RenterService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    alert('Please login to continue');
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
                if (currentUser.username) {
                    TellerService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    alert('Access is restricted to private');
                    $location.url('/home');
                    deferred.reject();
                }
            });

        return deferred.promise;
    }
})();