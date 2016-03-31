var app = angular.module('FormBuilderApp');

app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "views/home/home.view.html",
            controller: "HomeController"
        })
        .when("/register", {
            templateUrl: "views/users/register.view.html",
            controller: "RegisterController"
        })
        .when("/login", {
            templateUrl: "views/users/login.view.html",
            controller: "LoginController"
        })
        .when("/profile", {
            templateUrl: "views/users/profile.view.html",
            controller: "ProfileController",
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when("/admin", {
            templateUrl: "views/admin/admin.view.html",
            controller: "AdminController",
            resolve: {
                loggedin: checkAdmin
            }

        })
        .when("/forms", {
            templateUrl: "views/forms/forms.view.html",
            controller: "FormController",
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when("/form/:formId/fields", {
            templateUrl: "views/forms/fields.view.html",
            controller: "FieldController",
            resolve: {
                loggedin: checkLoggedin
            }
        })

        .otherwise({
            redirectTo: "/home"
        });
});
var checkLoggedin = function ($q, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/api/assignment/user/loggedin').success(function (user) {
        // User is Authenticated
        if (user) {
            $rootScope.user = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else {
            alert('You need to log in.');
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};

var checkAdmin = function($q, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/api/assignment/user/loggedin').success(function(user)
    {
        // User is Authenticated
        if (user && user.roles.indexOf('admin') != -1)
        {
            $rootScope.user = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else
        {
            alert('Please login as admin to continue');
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};