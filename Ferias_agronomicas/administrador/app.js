angular.module('moduloAdministrador',["ngRoute","ngResource"])
.config(['$routeProvider',function($routeProvider)
{
      console.log("Configurando");
      $routeProvider.when("/edicionInformacion",{templateUrl:'secciones/edicion_informacion.html',controller: 'informacionCtrl'})
                    .when("/estadisticasP",{templateUrl:'secciones/estadisticas_producto.html',controller: 'estadisticasPCtrl'})
                    .when("/estadisticasM",{templateUrl:'secciones/estadisticas_mes.html',controller: 'estadisticasMCtrl'})
                    .when("/informacion",{templateUrl:"secciones/informacion.html",controller: 'informacionCtrl'})
                    .when("/productos",{templateUrl:'secciones/productos.html',controller: 'productosCtrl'})
                    .when("/pedidos",{templateUrl:'secciones/pedidos.html',controller: 'pedidosCtrl'})
                    .when("/inicio",{templateUrl:'secciones/inicio.html',controller: 'inicioCtrl'});
}
]);


