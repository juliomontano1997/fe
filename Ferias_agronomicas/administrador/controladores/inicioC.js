angular.module('moduloAdministrador',["ngRoute","ngResource"])
.controller('inicioCtrl', function($scope, $http, $location, $anchorScroll)
{
    $scope.gotoBottom = function (param)
    {
        console.log("Cambiando de vista");
        $location.hash(param);
        $anchorScroll();
    };
    $scope.mostrarInformacion  = function ()
    {
        console.log("mostrando informacion");
        window.location.href =('#/informacion');
    }
});