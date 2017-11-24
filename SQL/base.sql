CREATE TABLE personas
(
	identificador int not null,
	nombre varchar(30) not null,
	apellido1 varchar(30) not null,
	apellido2 varchar(30) not null,
	rango varchar(30) not null,
	carrera varchar(50) not null,
	tipo boolean not null,
	contraseña varchar(10) not null,
	constraint PK_identificador_personas primary key (identificador)
);

CREATE TABLE correos
(
	identificador int not null,
	correo varchar(20) not null,
	constraint PK_identificador_correo primary key (identificador,correo),
	constraint FK_identificador_personas foreign key (identificador) references personas
);

CREATE TABLE telefonos
(
	identificador int not null,
	telefono varchar(10) not null,
	constraint PK_identificador_telefono primary key (identificador,telefono),
	constraint FK_identificador_personas foreign key (identificador) references personas
);

CREATE TABLE ordenes
(
	codigo int not null,
	identificadorCliente int not null,
	fechaEmision date not null,
	fechaCancelado date not null,
	estado boolean not null,
	monto money not null,
	constraint PK_codigo_ordenes primary key (codigo),
	constraint FK_identificadorCliente_personas foreign key (identificadorCliente) references personas
);

CREATE TABLE detalle
(
	codigoO int not null,
	codigoP int not null,
	cantidadProducto int not null,
	precioUnitario money not null,
	constraint PK_codigoO_codigoP primary key (codigoO,codigoP),
	constraint FK_codigoO_ordenes foreign key (codigoO) references ordenes,
	constraint FK_codigoP_productos foreign key (codigoP) references productos
);

CREATE TABLE producto
(
	codigo int not null,
	nombre varchar(30) not null,
	imagen varchar(100) not null,
	precioUnitarioActual money not null,
	unidadMedicion varchar(30) not null,
	descripcion varchar(100) not null,
	codigoV int not null,
	constraint PK_codigo_productos primary key (codigo),
	constraint FK_codigoV_variedad foreign key (codigoV) references variedades
);

CREATE TABLE variedades
(
	codigo varchar(10) not null,
	nombre varchar(30) not null,
	constraint PK_codigo_variedades primary key (codigo)
);

CREATE TABLE express
(
	codigo int not null,
	codigoO int not null,
	monto money not null,
	direccion varchar(50),
	fechaEntrega date not null,
	constraint PK_codigo_codigoO primary key (codigo,codigoO),
	constraint FK_codigoO_ordenes foreign key (codigoO) references ordenes
);

------------------------------------------------INSERTS DE PERSONAS--------------------------------------------------------------------
INSERT INTO personas (identificador, nombre, apellido1, apellido2, rango, carrera, tipo, contraseña) VALUES
(1,'Ana','Rojas' ,'Podriguez' ,'profesor','agronomia',true,'1'),
(2,'Federico','Boza' ,'Segura' ,'profesor','computacion',false,'2'),
(3,'Juan','Zocorro' ,'Mora','funcionario','institucional',false,'3'),
(4,'Jay','Garcia' ,'Lopez' ,'estudiante','electronica',false,'4'),
(5,'Natalia','Arce','Sanchez','estudiante','administracion',false,'5'),
(6,'Laura','Fuentes' ,'Castro' ,'funcionario','institucional',false,'6');

--------------------------------------------------INSERTS DE CORREOS-----------------------------------------------------------------
INSERT INTO correos (identificador,correo) VALUES
(1,'sbozda2@gmail.com'),
(2,'sfzas2@gmail.com'),
(3,'sbo2@gmail.com'),
(4,'sas2@gmail.com'),
(5,'soza@gmfail.com'),
(6,'fzas2@gmail.com');

---------------------------------------------------------INSERTS DE TELEFONOS----------------------------------------------------------
INSERT INTO telefonos (identificador,telefono) VALUES
(1,'9010-1111'),
(2,'4292-2346'),
(3,'1030-1111'),
(4,'4682-2211'),
(5,'1030-1111'),
(6,'4682-2211');

----------------------------------------------------------INSERTS DE VARIEDAD---------------------------------------------------------
INSERT INTO variedades (codigo,nombre) VALUES
(1,'caribeña'),
(2,'rojita'),
(3,'criolla'),
(4,'cherry');

----------------------------------------------------------INSERTS DE PRODUCTOS---------------------------------------------------------
INSERT INTO productos (codigo, nombre, imagen, precioUnitarioActual, unidadMedicion, descripcion, codigoV) VALUES
(1,'Papa','faltaEnlace',2500,'kilo','-',1);
(2,'Tomate','faltaEnlace',2500,'kilo','-',4);
(3,'Yuca','faltaEnlace',2500,'kilo','-',3);

---------------------------------------------------------INSERTS DE ORDENES------------------------------------------------------------
INSERT INTO ordenes (codigo, identificadorCliente, fechaEmision, fechaCancelado, estado, monto) VALUES
(1,2, '2017-02-21', '2017-02-21',true,2500),
(2,3,'2017-02-21', '2017-03-02',false,2500);

-----------------------------------------------------INSERTS DE DETALLES DE ORDENES----------------------------------------------------
INSERT INTO detalle (codigoO, codigoP, cantidadProducto, precioUnitario) VALUES
(1,2,1,2500),
(2,3,1,2500);

---------------------------------------------------------INSERTS DE EXPRESS------------------------------------------------------------
INSERT INTO express (codigo, codigoO, monto, direccion, fechaEntrega) VALUES
(1,1,500,'computacion','2017-03-03');