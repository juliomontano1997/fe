angular.module('moduloAdministrador',["ngRoute","ngResource"])
    .controller('estadisticasPCtrl', function($scope, $http, $location, $anchorScroll)
    {
        $scope.gotoBottom = function (param){
            $location.hash(param);
            $anchorScroll();
        };
        window.location.href =('#/informacion');
    });