angular.module('moduloAdministrador',["ngRoute","ngResource", "chart.js"])
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
    .controller("productosCtrl", function ($http,$scope,  $location, $anchorScroll)
    {
        $scope.productos; // lista que se va a recorrer

        $scope.cargarProductos = function () {

        };

        $scope.guardarProducto = function ()
        {
            console.log("Guardando producto");
        };

        $scope.siguienteProducto = function ()
        {
            console.log("Siguiente producto");
        };

        $scope.anteriorProducto = function ()
        {
            console.log("anterior producto");
        };

        $scope.eliminarProducto = function ()
        {
            console.log("eliminando producto");
        };
        
        $scope.guardarImagenEditada = function ()
        {
            console.log("imagen producto");
        };
    })
    
    .controller("pedidosCtrl", function ($http,$scope, $location, $anchorScroll)
    {
        $scope.clientes;  // nombre, cedula
        $scope.pedidos;  // id, cedula, fecha
        $scope.productosPedidos;  // almacena los productos del pedido actual



        $scope.cargarInformacionClientes = function ()
        {
            
        };
        
        $scope.cargarPedidoPorCliente = function ()
        {

        };

        $scope.cargarProductosPedido = function ()  // con el id del pedido se trae los productos (JSON) con:  cantidad, precio unitario
        {

        };

        $scope.aceptarPedido = function ()
        {

        };

        $scope.eliminarPedido = function ()
        {

        };

        $scope.siguientePedido =  function ()
        {

        };
    })

    .controller("estadisticasPCtrl", function ($http,$scope, $location, $anchorScroll)
    {
        console.log("estadisticasPCtrl");
    })
    .controller("estadisticasMCtrl", function ($http,$scope, $location, $anchorScroll)
    {
        console.log("estadisticasMCtrl");
    })
    .controller("informacionECtrl", function ($http,$scope, $location, $anchorScroll)
    {
        $scope.cargarInformacionActual = function ()
        {

        }

        $scope.guardarInformacionEditada = function ()
        {

        }
    })
    .config(['$routeProvider',function($routeProvider)
    {
        console.log("PAso por aqui");
            $routeProvider.when("/edicionInformacion",{templateUrl:'secciones/edicion_informacion.html',controller: 'informacionECtrl'})
                          .when("/estadisticasP", {templateUrl:'secciones/estadisticas_producto.html',controller: 'estadisticasPCtrl'})
                          .when("/estadisticasM",{templateUrl:'secciones/estadisticas_mes.html',controller: 'estadisticasMCtrl'})
                          .when("/informacion",{templateUrl:"secciones/informacion.html",controller: 'informacionCtrl'})
                          .when("/productos",{templateUrl:'secciones/productos.html',controller: 'productosCtrl'})
                          .when("/pedidos",{templateUrl:'secciones/pedidos.html',controller: 'pedidosCtrl'});
    }]);



