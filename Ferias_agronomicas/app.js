

var app = angular.module('loginModule',["ngRoute","ngResource"]);
app.controller('inicio', function($scope, $http, $location, $anchorScroll)
{
    $scope.username = "";
    $scope.password = "";

    $scope.gotoBottom = function (param)
    {
        //window.location.href =('#/quieneSomos');
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

        /* $http({method : "GET", url:'http://localhost:8081/autenticacion?user='+$scope.username+'&password='+$scope.password})
             .then(
                 function mySucces(response)
                 {
                     alert(response);
                     console.log(response);
                     if(response.data[0].mg_login===true) {}
                     else {alert("Hubo un error en la peticion");}
                 },
                 function myError(response) {alert("No tienes conexion");});*/
    };
});




app.config(['$routeProvider',function($routeProvider)
{
    $routeProvider.when("/quienesSomos",{templateUrl:'main/secciones/quienes_somos.html',controller: 'inicio'})
    .when("/login",{templateUrl:'main/secciones/login.html',controller: 'inicio'});
}
]);


