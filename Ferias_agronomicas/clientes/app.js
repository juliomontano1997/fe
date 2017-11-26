angular.module('moduloCliente',["ngRoute","ngResource", "chart.js"])
    .controller('mainCtrl', function ($http, $location, $anchorScroll)
    {
          window.location.href=("#/informacion#datos1");
    })
    .controller("informacionCtrl", function ($http,$scope,  $location, $anchorScroll)
    {
        var parametros = location.hash.split("#");
        console.log(parametros);
        if(parametros.length>2)
        {
            $location.hash(parametros[2]);
            $anchorScroll();
        }
    })
    .controller("pedidosCtrl", function ($http,$scope,  $location, $anchorScroll)
    {
    })
    .config(['$routeProvider',function($routeProvider)
    {
        console.log("PAso por aqui");
            $routeProvider.when("/informacion",{templateUrl:"../main/secciones/quienes_somos.html",controller: 'informacionCtrl'})
                          .when("/nuevoPedido",{templateUrl:'secciones/nuevoPedido.html',controller: 'pedidosCtrl'});
    }]);



