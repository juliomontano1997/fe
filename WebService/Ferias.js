/*
* Configuraciones del Web service
* */
var pg = require('pg');
var conString = "postgres://postgres:postgresql2017@localhost:5432/ferias";
var client;
var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var cn = {host:'localhost', port:5432, database:'ferias', user:'postgres', password:'postgresql2017'};
var db = pgp(cn);


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
    next();
});



// login
app.get('/autenticacion',
    function(req, res)
    {
        db.func('mg_login', [req.query.user, req.query.password])
            .then(data=> {console.log(data); res.end(JSON.stringify(data));})
            .catch(error=>{console.log(error); res.end(JSON.stringify(false))})
    }
);


app.get('/get_productos',
    function(req, res)
    {
        db.func('mg_get_productos',[])
            .then(data=> {console.log(data); res.end(JSON.stringify(data));})
            .catch(error=>{console.log(error); res.end(JSON.stringify(false))})
    }
);

app.post('/modificar_producto',
    function(req, res)
    {
        db.func('modificar_productos', [req.query.codigo, req.query.nombre, req.query.imagen,
                                        req.query.precio, req.query.medicion, req.query.descripcion])
        .then(data=> {  console.log(data);  res.end(JSON.stringify(data));})
        .catch(error=>{ console.log(error); res.end(JSON.stringify(false))})
    }
);




//-----------------------   insercion de pedidos ----------------------------------------



app.get('/agregar_pedido',
    function(req, res)
    {
        db.func('insertar_ordenes', [req.query.cedula, req.query.fecha, req.query.monto])
            .then(data=> {  console.log(data);  res.end(JSON.stringify(data));})
            .catch(error=>{ console.log(error); res.end(JSON.stringify(false))})
    }
);



app.post('/agregar_detalle',
    function(req, res)
    {
        db.func('insertar_detalles', [req.query.codigoO, req.query.codigoP, req.query.cantidad,req.query.precio])
            .then(data=> {  console.log(data);  res.end(JSON.stringify(data));})
            .catch(error=>{ console.log(error); res.end(JSON.stringify(false))})
    }
);


//::::::::::::::::::::::::::::::::: CONFIGURACION DE INICIO :::::::::::::::::::::::::::::::::::::::::
var server = app.listen(8081,function()
{
    var host = server.address().address;
    var port = server.address().port;
    console.log("El servidor esta corriendo http://%s:%s", host, port);
});
