-- Dominios

--TELEFONO
CREATE DOMAIN t_telefono char(9) not null constraint CHK_telefono check (value similar to '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]');

--CORREO
CREATE DOMAIN t_correo varchar(50) not null constraint CHK_correo check (value similar to '[A-z]%@[A-z]%.[A-z]%');

--GENERO
CREATE DOMAIN t_genero boolean not null;

--CEDULA
CREATE DOMAIN t_cedula char(11) not null constraint CHK_cedula check (value similar to '[0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]');

--DESCRIPCIONES
CREATE DOMAIN t_nombre varchar(30) not null;

CREATE DOMAIN t_descripcion varchar(100) not null;

-- TIPO
CREATE DOMAIN t_tipo varchar(2) not null constraint CHK_tipoPersona check(value in ('A','U'));

--CONTREASEÑA
CREATE DOMAIN t_contrasena varchar(5) not null;



CREATE TABLE personas
(
	identificador t_cedula not null,
	nombre t_nombre not null,
	apellido1 t_nombre not null,
	apellido2 t_nombre not null,
	rango varchar(30) not null,
	carrera varchar(50) not null,
	tipo t_tipo not null,
	contraseña varchar not null,
	constraint PK_identificador_personas primary key (identificador)
);


CREATE TABLE correos
(
	identificador t_cedula not null,
	correo t_correo not null,
	constraint PK_identificador_correo primary key (identificador,correo),
	constraint FK_identificador_personas foreign key (identificador) references personas
);

CREATE TABLE telefonos
(
	identificador t_cedula not null,
	telefono t_telefono not null,
	constraint PK_identificador_telefono primary key (identificador,telefono),
	constraint FK_identificador_personas foreign key (identificador) references personas
);



CREATE TABLE ordenes
(
	codigo serial not null,
	identificadorCliente t_cedula not null,
	fechaEmision date not null,
	fechaCancelado date not null default CURRENT_DATE,
	estado boolean not null default true,
	monto money not null,
	constraint PK_codigo_ordenes primary key (codigo),
	constraint FK_identificadorCliente_personas foreign key (identificadorCliente) references personas
);

CREATE TABLE variedades
(
	codigo serial not null,
	nombre t_nombre not null,
	constraint PK_codigo_variedades primary key (codigo)
);

CREATE TABLE productos
(
	codigo serial not null,
	nombre t_nombre not null,
	imagen varchar(20) not null,
	precioUnitarioActual money not null,
	unidadMedicion varchar(30) not null,
	descripcion t_descripcion not null,
	codigoV int not null,
	constraint PK_codigo_producto primary key (codigo),
	constraint FK_codigoV_variedad foreign key (codigoV) references variedades
);

CREATE TABLE detalles
(
	codigoO int not null,
	codigoP int not null,
	cantidadProducto int not null,
	precioUnitario money not null,
	constraint PK_codigoO_codigoP primary key (codigoO, codigoP),
	constraint FK_codigoO_ordenes foreign key (codigoO) references ordenes,
	constraint FK_codigoP_producto foreign key (codigoP) references productos
);

CREATE TABLE express
(
	codigo int not null,
	codigoO int not null,
	monto money not null,
	direccion varchar(50) not null,
	fechaEntrega date not null,
	constraint PK_codigo_codigoO primary key (codigo,codigoO),
	constraint FK_codigoO_ordenes foreign key (codigoO) references ordenes
);

-------------------------------------------------------METODO DE PRODUCTOS---------------------------------------------------------------
CREATE OR REPLACE
FUNCTION insertar_productos(e_nombre t_nombre, e_imagen varchar(30),e_precioUnitarioActual numeric, e_unidadMedicion varchar(30), e_descripcion t_descripcion, e_variedad t_nombre)
RETURNS BOOLEAN AS
$body$
DECLARE
	codigo_v int;
BEGIN
	codigo_v = (SELECT COUNT(nombre) FROM variedades WHERE nombre = e_variedad);
	IF (codigo_v = 0) THEN
		INSERT INTO variedades (nombre) VALUES (e_variedad);
		INSERT INTO productos (nombre, imagen, precioUnitarioActual, unidadMedicion, descripcion, codigoV) VALUES
			(e_nombre, e_imagen, e_precioUnitarioActual, e_unidadMedicion, e_descripcion, (SELECT currval('variedades_codigo_seq')));
		RETURN TRUE;
	ELSE
		INSERT INTO productos (nombre, imagen, precioUnitarioActual, unidadMedicion, descripcion, codigoV) VALUES
			(e_nombre, e_imagen, e_precioUnitarioActual, e_unidadMedicion, e_descripcion, codigo_v);
		RETURN TRUE;

	END IF;
END;
$body$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION modificar_productos(e_codigo int ,e_nombre t_nombre, e_imagen varchar(30),e_precioUnitarioActual numeric, e_unidadMedicion varchar(30), e_descripcion t_descripcion)
RETURNS BOOLEAN AS
$body$
BEGIN
	UPDATE productos SET (nombre, imagen, precioUnitarioActual, unidadMedicion, descripcion)=(e_nombre, e_imagen, e_precioUnitarioActual, e_unidadMedicion, e_descripcion) WHERE codigo = e_codigo ;
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION eliminar_productos(e_codigo int )
RETURNS BOOLEAN AS
$body$
BEGIN
	DELETE FROM productos WHERE codigo = e_codigo;
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;

--------------------------------------------------------METODO DE ORDENES-------------------------------------------------------------
CREATE OR REPLACE FUNCTION insertar_ordenes(e_cedula t_cedula, e_fecha date, e_monto numeric)
RETURNS INT AS
$body$
BEGIN
	INSERT INTO ordenes(identificadorCliente, fechaEmision, monto) VALUES (e_cedula, e_fecha, e_monto);
	RETURN (SELECT MAX(codigo) FROM ordenes);
	EXCEPTION WHEN OTHERS THEN RETURN -1;
	
END;
$body$
LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION eliminar_ordenes(e_codigoO int )
RETURNS BOOLEAN AS
$body$
BEGIN
	DELETE FROM ordenes WHERE codigo = e_codigoO;
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;

-------------------------------------------------------------------METODOS DE DETALLE-----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION insertar_detalles(e_codigoO int, e_codigoP int, e_cantidadProducto int, e_precioU numeric)
RETURNS BOOLEAN AS 
$body$
BEGIN
	INSERT INTO detalles(codigoO, codigoP, cantidadProducto, precioUnitario) VALUES (e_codigoO, e_codigoP, e_cantidadProducto, e_precioU);
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION eliminar_detalles(e_codigoO int, e_codigoP int )
RETURNS BOOLEAN AS
$body$
BEGIN
	DELETE FROM detalles WHERE codigoO = e_codigoO and codigoP = e_codigoP;
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;

-------------------------------------------------------------METODOS GETS-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION mg_login(e_cedula t_cedula, e_password varchar)
RETURNS VARCHAR AS
$body$
DECLARE
	tipoP varchar(2);
BEGIN
	tipoP = (SELECT tipo FROM personas  WHERE contraseña = md5(e_password || e_cedula ||'azZA'));
	IF (tipoP = NULL) THEN
		RETURN NULL;
	ELSE
		RETURN tipoP;
	END IF;
END;
$body$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION mg_get_productos(OUT r_codigo INT, OUT r_unidadMedicion varchar(30),OUT r_imagen varchar(20), OUT r_nombre t_nombre, OUT r_precio NUMERIC, OUT r_descripcion t_descripcion, OUT r_id_variedad INT, OUT r_nombre_variedad t_nombre)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query SELECT  productos.codigo,unidadMedicion,productos.imagen, productos.nombre, productos.precioUnitarioActual::NUMERIC, productos.descripcion, variedades.codigo, variedades.nombre from
		productos
		inner join
		variedades
		on productos.codigoV = variedades.codigo;
END;
$body$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION mg_get_productos_factura(IN e_codigoO INT,OUT r_id_factura INT, OUT r_id INT, OUT r_nombre t_nombre,
							     OUT r_precio NUMERIC, OUT r_cantidad INT, OUT r_precio_parcial NUMERIC)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query SELECT detalles.codigoO ,productos.codigo, productos.nombre, productos.precioUnitarioActual::NUMERIC, detalles.cantidadProductos, detalles.precioUnitario::NUMERIC from
		productos
		inner join
		detalles
		on detalles.codigoP = productos.codigo and detelles.codigoO = e_codigoO;
END;
$body$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION mg_get_estadisticasProductos(OUT r_nombre TEXT,OUT r_promedio NUMERIC)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query
	SELECT coalesce(p.nombre||' '||v.nombre) nombre , o.promedio FROM
	(SELECT codigo, nombre, codigoV FROM productos) p INNER JOIN
	(SELECT codigo, nombre FROM variedades)v ON v.codigo = p.codigoV INNER JOIN
	(SELECT codigoP, AVG(CAST(precioUnitario AS NUMERIC)*cantidadProducto) "promedio" FROM detalles GROUP BY codigoP) o ON o.codigoP = p.codigo;
END;
$body$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION mg_get_estadisticasMes(OUT r_mes TEXT, OUT r_promedio NUMERIC)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query
	SELECT to_char(CAST(fechaCancelado AS date),'Month'), AVG(CAST(monto AS NUMERIC)) "Promedio" FROM ordenes where estado = false
	GROUP BY fechaCancelado ORDER BY to_char(fechaCancelado,'MM');
END;
$body$
LANGUAGE plpgsql;

----------------------------------------------------------INSERTS DE PERSONAS--------------------------------------------------------------------
INSERT INTO personas (identificador, nombre, apellido1, apellido2, rango, carrera, tipo, contraseña) VALUES
('1-1111-1111','Ana','Rojas' ,'Podriguez' ,'profesor','agronomia','A',md5('11111'||'1-1111-1111'||'azZA')),
('2-2222-2222','Federico','Boza' ,'Segura' ,'profesor','computacion','U',md5('22222'||'2-2222-2222'||'azZA')),
('3-3333-3333','Juan','Zocorro' ,'Mora','funcionario','institucional','U',md5('33333'||'3-3333-3333'||'azZA')),
('4-4444-4444','Jay','Garcia' ,'Lopez' ,'estudiante','electronica','U',md5('44444'||'4-4444-4444'||'azZA')),
('5-5555-5555','Natalia','Arce','Sanchez','estudiante','administracion','U',md5('55555'||'5-5555-5555'||'azZA')),
('6-6666-6666','Laura','Fuentes' ,'Castro' ,'funcionario','institucional','U',md5('66666'||'6-6666-6666'||'azZA'));

--------------------------------------------------INSERTS DE CORREOS-----------------------------------------------------------------
INSERT INTO correos (identificador,correo) VALUES
('1-1111-1111','sbozda2@gmail.com'),
('2-2222-2222','sfzas2@gmail.com'),
('3-3333-3333','sbo2@gmail.com'),
('4-4444-4444','sas2@gmail.com'),
('5-5555-5555','soza@gmfail.com'),
('6-6666-6666','fzas2@gmail.com');

---------------------------------------------------------INSERTS DE TELEFONOS----------------------------------------------------------
INSERT INTO telefonos (identificador,telefono) VALUES
('1-1111-1111','9010-1111'),
('2-2222-2222','4292-2346'),
('3-3333-3333','1030-1111'),
('4-4444-4444','4682-2211'),
('5-5555-5555','1030-1111'),
('6-6666-6666','4682-2211');

----------------------------------------------------------INSERTS DE VARIEDAD---------------------------------------------------------
INSERT INTO variedades (nombre) VALUES
('Amarilla'),
('Rojita'),
('Criolla'),
('Cherry'),
('Romana'),
('Lollo Rosso'),
('Marketmore'),
('Habanero'),
('Jalapeño'),
('Coyote');
----------------------------------------------------------INSERTS DE PRODUCTOS---------------------------------------------------------
INSERT INTO productos (nombre, imagen, precioUnitarioActual, unidadMedicion, descripcion, codigoV) VALUES
('Papa','papa.png',2500,'kilo','Papa Amarilla',1),
('Tomate','tomate.jpg',2500,'kilo','Tomate Cherry',4),
('Yuca','yuca.jpg',2500,'kilo','Yuca Criolla',3),
('Lechuga','lechugaR.jpg',1600,'unidad','Lechuga Romana',5),
('Lechuga','lechugaL.jpg',1900,'unidad','Lechuga Lollo Rosso',6),
('Pepino','pepino.jpg',700,'kilo','Pepino Marketmore',7),
('Chile','habanero.jpg',900,'kilo','Chile Habanero',8),
('Chile','jalapeño.jpg',1000,'kilo','Chile Jalapeño',9),
('Culantro','culantro.jpg',350,'bolsa','Culantro Coyote',10);

---------------------------------------------------------INSERTS DE ORDENES------------------------------------------------------------
INSERT INTO ordenes (identificadorCliente, fechaEmision, monto) VALUES
('2-2222-2222', '2017-02-21',4100),
('3-3333-3333','2017-04-26', 4100),
('4-4444-4444', '2017-06-15',350),
('5-5555-5555','2017-03-02', 700),
('6-6666-6666', '2017-09-11',2500),
('3-3333-3333','2017-11-10', 2500),
('2-2222-2222', '2017-12-01',1000),
('5-5555-5555','2017-01-06', 900);

-----------------------------------------------------INSERTS DE DETALLES DE ORDENES----------------------------------------------------
INSERT INTO detalles (codigoO, codigoP, cantidadProducto, precioUnitario) VALUES
(1,3,3,2500),
(1,6,4,1600),
(2,2,2,2500),
(2,7,5,1600),
(3,9,2,350),
(4,6,1,700),
(5,3,6,2500),
(6,1,4,2500),
(7,8,7,1000),
(8,7,4,900);

---------------------------------------------------------INSERTS DE EXPRESS------------------------------------------------------------
INSERT INTO express (codigo, codigoO, monto, direccion, fechaEntrega) VALUES
(1,1,500,'computacion','2017-03-03');
