angular.module('moduloAdministrador',["ngRoute","ngResource"])
    .controller('informacionCtrl', function($scope, $http, $location, $anchorScroll)
    {
        $scope.gotoBottom = function (param){
            $location.hash(param);
            $anchorScroll();
        };
    });