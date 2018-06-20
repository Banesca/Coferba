/****SQL****/

INSERT INTO `tb_tenant` (`idTenant`, `fullNameTenant`, `idTypeKf`, `phoneNumberTenant`, `idDepartmentKf`, `emailTenant`, `idStatusKf`, `dateCrated`, `phoneNumberContactTenant`) VALUES
						(1, 'David Rincon', 1, '54115778345', 1, 'rexx84@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(2, 'Alberto Fabian', 1, '54115778345', 2, 'Alberto.Fabian@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(3, 'Eduardo Peliacani', 1, '54115778345', 3, 'Eduardo.Peliacani@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(4, 'Carlos Lazarte', 1, '54115778345', 4, 'Carlos.Lazarte@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(5, 'Marcos Padilla', 1, '54115778345', 5, 'Marcos.Padilla@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(6, 'Nahuel Barrati', 1, '54115778345', 6, 'Nahuel.Barrati@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(7, 'Jan Zambrano', 1, '54115778345', 7, 'Jan.Zambrano@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(8, 'Marcos Quispes', 1, '54115778345', 8, 'Marcos.Quispes@gmail.com', 1, '2017-10-18 01:07:25', '54115778345');
						(9, 'Beatriz Gonzalez', 1, '54115778345', 9, 'Beatriz.Gonzalez@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(10, 'Juan de Vicenti', 1, '54115778345', 10, 'juan.vicenti@gmail.com', 1, '2017-10-18 01:07:25', '54115778345'),
						(11, 'Jorge Gutierrez', 2, '541189054333', 11, 'jorguti85@gmail.com', 1, '2017-10-18 01:07:25', '541189054333'),
						(12, 'Carlos Romero', 2, '541189054333', 12, 'jorguti86@gmail.com', 1, '2017-10-18 01:07:25', '541189054333'),
						(13, 'Jose Carrasco', 2, '541189054333', 13, 'jorguti87@gmail.com', 1, '2017-10-18 01:07:25', '541189054333'),
						(14, 'Alfredo Wirth', 2, '541189054333', 14, 'jorguti88@gmail.com', 1, '2017-10-18 01:07:25', '541189054333'),
						(15, 'Victor Machado', 2, '541189054333', 15, 'jorguti89@gmail.com', 1, '2017-10-18 01:07:25', '541189054333'),
						(16, 'Martin Hatchman', 2, '541189054333', 16, 'jorguti90@gmail.com', 1, '2017-10-18 01:07:25', '541189054333'),
						(17, 'Flavio Alfano', 2, '541189054333', 17, 'jorguti91@gmail.com', 1, '2017-10-18 01:07:25', '541189054333'),
						(18, 'Jorge Dangelo', 2, '541189054333', 18, 'jorguti92@gmail.com', 1, '2017-10-18 01:07:25', '541189054333');


INSERT INTO `tb_department` (`idDepartment`, `departmentAddress`, `departmentFloor`, `deparmentNumber`, `departmentLat`, `departmentLon`, `deparmentDescription`, `idStatusKf`, `idUserAdminRKf`, `idUserAdminPropietariKf`) VALUES
							(1, 'Arribeños 3740', 'Porteria', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(2, 'Arribeños 3740', '1-A', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(3, 'Arribeños 3740', '1-B', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(4, 'Arribeños 3740', '2-A', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(5, 'Arribeños 3740', '2-B', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(6, 'Arribeños 3740', '3-A', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(7, 'Arribeños 3740', '3-B', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(8, 'Arribeños 3740', '4-A', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(9, 'Arribeños 3740', '4-B', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(10, 'Arribeños 3740', '5-A', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(11, 'Arribeños 3740', '5-B', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(12, 'Arribeños 3740', '6-A', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(13, 'Arribeños 3740', '6-B', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(14, 'Arribeños 3740', '7-A', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(15, 'Arribeños 3740', '7-B', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(16, 'Arribeños 3740', '8-A', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
							(17, 'Arribeños 3740', '8-B', 700, '-34.543923', '-58.461462', 'Capital Federal, Nuñez', 1, 1, NULL),
						
						
	

PENDIENTE:
	*Actualizar variables Localstorage al hacer un update de usuario.
	*Tamaño fijo de los textarea.
	*Modulo olvide contraseña y servicio.
	*Consultar si desea realizar un alta de llave {modulo de baja de llave}
	*Adicionar campo de seleccion de departamento al formulario registro y mostrar listado de dpto segun direccion.



	host: https://databases.000webhost.com/
	user: id2317832_admin
	pass: admin