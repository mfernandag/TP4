const employees = [{
    'name': 'Bruce Wayne', 'email': 'bruce@wayneenterprises.com', 'adress': 'Gotham ', 'phone': '1190984864'
}];
//console.log(employees)
const getEmployee = (req, res, next) => {
	res.json({ employees });
	next();
};

const patchEmployeeData = (req, res, next) => {
	let data = req.body;
	let index = ''; 
	let resEmployee = employees.find((e, i) => {
		index = i;
		return e.id === req.params.id;
	});

	if (resEmployee) {
		let editedEmployee = { ...resEmployee, ...data };
		employees.splice(1, index);
		employees.push(editedEmployee);
	} else {
		res.status(404).send('Not found');
	}
}; //ok hasta acá, devuelve el objeto employees

const postEmployee = (req, res, next) => {
	let data = req.body;
	if (data.hasOwnProperty('name') && data.hasOwnProperty('email')) {
		data.id = employees.length + 1; // para el tp, pongamos una generación de ID mas segura.
		employees.push(data);
		res.status('201').json(`recibido con el id ${data.id}`);
	} else {
		res.status('400').json('fijate que pusiste mal los datos, ameo.');
	}
	next();
}; //ok también

//búsqueda de empleades por id
const getEmployeeByid = (req, res, next) => {
	let resEmployee = employees.find((e) => e.id === req.params.id);
	if (resEmployee) {
		res.json(resEmployee);
	} else {
		res.status(404).send('no encontramos al empleade');
	}
};
 
module.exports = { getEmployee, getEmployeeByid, postEmployee };
//module.exports = { getEmployee, getEmployeeByid, postEmployee }; //vincular estas funciones con el router