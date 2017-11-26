

var app = angular.module('loginModule',["ngRoute","ngResource"]);
app.controller('inicio', function($scope, $http, $location, $anchorScroll)
{
    $scope.username = "";
    $scope.password = "";

    $scope.goto= function (param)
    {
        $location.hash(param);
        $anchorScroll();
    };

    $scope.doLogin = function ()
    {
        if($scope.username ==='a')
        {
            window.location.href = ('administrador/adminIndex.html');
        }
        else
        {
            window.location.href = ('clientes/clientesIndex.html');
        }
    };
});


app.config(['$routeProvider',function($routeProvider)
{
    $routeProvider.when("/quienesSomos",{templateUrl:'main/secciones/quienes_somos.html',controller: 'inicio'})
    .when("/login",{templateUrl:'main/secciones/login.html',controller: 'inicio'});
}
]);


