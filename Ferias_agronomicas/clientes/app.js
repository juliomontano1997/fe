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
        $scope.productos;
        var ced = localStorage.getItem("ced_cliente");
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1; //hoy es 0!
        var yyyy = hoy.getFullYear();

        if(dd<10) {dd='0'+dd}

        if(mm<10){mm='0'+mm}

        hoy = yyyy+'-'+mm +'-'+dd;


        $scope.pedido  = new Pedido(ced, hoy);

        $scope.agregarAcarrito = function (param)
        {
            var seleccion = $scope.productos[param];
            var bandera = false;


            for(i=0; i<$scope.pedido.detalles.length; i++)
            {
                if ($scope.pedido.detalles[i].nombre === seleccion.r_nombre)
                {
                    $scope.pedido.detalles[i].cantidad +=1;
                    console.log("sumado");
                    bandera = true;
                    $scope.pedido.calcularMonto();
                }
            }
            if(!bandera)
            {
                $scope.pedido.detalles.push(new Detalle(seleccion.r_codigo, seleccion.r_nombre, 1, seleccion.r_precio));
                $scope.pedido.calcularMonto();
            }
        };


        $scope.confirmarPedido = function()
        {
            $scope.pedido.guardar();
        };

        function  cargarProductos()
        {
            $http({method : "GET", url:'http://localhost:8081/get_productos'})
                .then(
                    function mySucces(response) {$scope.productos = response.data; console.log($scope.productos)},
                    function myError(response) {alert("No tienes conexion");});
        }


        // objetos para guardar la informacion


        function Detalle(id,nombre,cantidad,precio) {
            this.id= id;
            this.precio = precio;
            this.nombre = nombre;
            this.cantidad = cantidad;
        }

        function Pedido(cedula, fecha) {

            this.cedula = cedula;
            this.fecha = fecha;
            this.monto = 0;
            this.detalles = [];

            this.calcularMonto = function ()
            {
                var max = this.detalles.length;
                var montoFinal=0;
                for (i=0; i<max; i++)
                {
                    montoFinal += this.detalles[i].cantidad*this.detalles[i].precio;
                }
                this.monto = montoFinal;
            };



            this.guardar = function ()
            {
                var detalles  = this.detalles;
                $http({method : "GET", url:'http://localhost:8081/agregar_pedido?cedula='+this.cedula+"&fecha="+this.fecha+"&monto="+this.monto})
                    .then(
                        function mySucces(response)
                        {
                            var id = response.data[0].insertar_ordenes;
                            console.log(id);

                            if(response.data!== -1 )
                            {
                                for(i=0;i<detalles.length; i++)
                                {

                                    console.log(detalles[i]);
                                    $http({method : "POST", url:'http://localhost:8081/agregar_detalle?codigoO='+id+"&codigoP="+detalles[i].id+
                                                                "&cantidad="+detalles[i].cantidad+"&precio="+detalles[i].precio})
                                        .then(
                                            function mySucces(res) {console.log(res)},
                                            function myError(res) {alert("No tienes conexion");});
                                }
                                alert("Pedido completado");
                                window.location.reload();
                            }
                        },
                        function myError(response) {alert("No tienes conexion");});
            }
        }
        cargarProductos();
    })








    .config(['$routeProvider',function($routeProvider)
    {
        console.log("PAso por aqui");
            $routeProvider.when("/informacion",{templateUrl:"../main/secciones/quienes_somos.html",controller: 'informacionCtrl'})
                          .when("/nuevoPedido",{templateUrl:'secciones/nuevoPedido.html',controller: 'pedidosCtrl'});
    }]);



