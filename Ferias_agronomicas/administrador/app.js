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
        $scope.productoActual;
        var indiceActual = 0;

        function  cargarProductos()
        {
            $http({method : "GET", url:'http://localhost:8081/get_productos'})
                .then(
                    function mySucces(response) {if(response.data!= false){$scope.productos = response.data;$scope.productoActual= $scope.productos[0];}},
                    function myError(response) {alert("No tienes conexion");});
        }

        $scope.anterior = function ()
        {
            if(indiceActual===0)
            {
                return;
            }
            else{
                indiceActual--;
            }
            $scope.productoActual = $scope.productos[indiceActual];
        };

        $scope.guardar = function ()
        {

            $http({method : "POST", url:'http://localhost:8081/modificar_producto?codigo='+$scope.productoActual.r_codigo+
                '&nombre='+$scope.productoActual.r_nombre+'&imagen='+$scope.productoActual.r_imagen+
            '&precio='+$scope.productoActual.r_precio+'&medicion='+$scope.productoActual.r_unidadMedicion+
            '&descripcion='+$scope.productoActual.r_descripcion})
                .then(
                    function mySucces(response) {if(response.data!= false){alert("Guardado")}},
                    function myError(response) {alert("No tienes conexion");});
        };


        $scope.siguiente = function ()
        {
            if(indiceActual=== $scope.productos.length-1)
            {
                return;
            }
            else{
                indiceActual++;
            }
            $scope.productoActual = $scope.productos[indiceActual];
        };


        $scope.eliminar = function ()
        {
            var producto = $scope.productos[indiceActual];
        };
        cargarProductos();
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
        $scope.ingresoProductos;
        var nombres = [];
        var ingresos = [];
        $http({method : "GET", url:'http://localhost:8081/ingresosProducto'})
            .then(
                function mySucces(response)
                {
                    $scope.ingresoProductos = response.data;
                    var maximo = $scope.ingresoProductos.length;
                    for(i=0; i<maximo; i++)
                    {
                        nombres[i]=$scope.ingresoProductos[i].r_nombre;
                        ingresos[i]=$scope.ingresoProductos[i].r_promedio;
                    }

                    var ctx = document.getElementById('myChart').getContext('2d');
                    var chart = new Chart(ctx, {
                        // The type of chart we want to create
                        type: "bar",

                        // The data for our dataset
                        data: {
                            labels: nombres,
                            datasets: [{
                                label: "Ingresos por producto:",
                                backgroundColor: 'rgb(0, 102, 255)',
                                borderColor: 'rgb(0, 102, 255)',
                                data: ingresos
                            }]
                        },

                        // Configuration options go here
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            }
                        }
                    });
                },
                function myError(response) {alert(response);}
            );
    })
    .controller("estadisticasMCtrl", function ($http,$scope, $location, $anchorScroll)
    {

        $scope.ingresoMeses;
        var ingresos = [];
        $http({method : "GET", url:'http://localhost:8081/ingresosMes'})
            .then(
                function mySucces(response)
                {
                    $scope.ingresoMeses = response.data;
                    var maximo = $scope.ingresoMeses.length;
                    for(i=0; i<maximo; i++)
                    {
                        ingresos[i]=$scope.ingresoMeses[i].r_promedio;
                    }
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var chart = new Chart(ctx, {
                        // The type of chart we want to create
                        type: "bar",

                        // The data for our dataset
                        data: {
                            labels: months,
                            datasets: [{
                                label: "Ingreso del mes:",
                                backgroundColor: 'rgb(0, 102, 255)',
                                borderColor: 'rgb(0, 102, 255)',
                                data: ingresos
                            }]
                        },

                        // Configuration options go here
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            }
                        }
                    });


                },
                function myError(response) {alert(response);}
            );


    })

    .controller("informacionECtrl", function ($http,$scope, $location, $anchorScroll)
    {
        $scope.cargarInformacionActual = function ()
        {

        };

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
                          .when("/informacion",{templateUrl:"../main/secciones/quienes_somos.html",controller: 'informacionCtrl'})
                          .when("/productos",{templateUrl:'secciones/productos.html',controller: 'productosCtrl'})
                          .when("/pedidos",{templateUrl:'secciones/pedidos.html',controller: 'pedidosCtrl'});
    }]);



