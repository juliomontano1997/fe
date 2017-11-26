angular.module('loginModule',["ngRoute","ngResource"])
.controller('mainCtrl', function ()
{
    window.location.href =("#/quienesSomos#datos1");
})
.controller('inicio', function($scope, $http, $location, $anchorScroll)
{
    $scope.username = "";
    $scope.password = "";

    var parametros = location.hash.split("#");
    console.log(parametros);
    if(parametros.length>2)
    {
        console.log("PASO"+parametros[2]);
        $location.hash(parametros[2]);
        $anchorScroll();
    }


    $scope.doLogin = function ()
    {
        window.location.href = ('administrador/adminIndex.html');

    }


        /*

        $http({method : "GET", url:'http://localhost:8081/autenticacion?user='+$scope.username+'&password='+$scope.password})
            .then(
                function mySucces(response)
                {
                    alert(response);
                    console.log(response);
                    if(response.data[0].mg_login==='A') { window.location.href = ('administrador/adminIndex.html');}
                    else if (response.data[0].mg_login==='U') {window.location.href = ('clientes/clientesIndex.html');}
                    else {alert("Hubo un error en la peticion");}
                },
                function myError(response) {alert("No tienes conexion");}
                );
    };*/
})
.config(['$routeProvider',function($routeProvider)
{
    $routeProvider.when("/quienesSomos",{templateUrl:'main/secciones/quienes_somos.html',controller: 'inicio'})
    .when("/login",{templateUrl:'main/secciones/login.html',controller: 'inicio'});
}
]);


