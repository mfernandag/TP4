const uniqid = require('uniqid');

const users = [
	{ id: '1', name: 'Darth Vader', email: 'heladoscuro@gmail.com', address: 'Death Star', phone: 123456},

];

const getUser = (req, res, next) => {
	res.json({ users });
	next();
};

/*
const patchUser = (req, res, next) => {
	let data = req.body;
	let index = '';
	let resUser = users.find((e, i) => {
		index = i;
		return e.id === req.params.id;
	});
	if (resUser) {
		let editedUser = { ...resUser, ...data };
		user.splice(1, index);
		user.push(editedUser);
	} else {
		res.status(404).send('no encontramos al usuario');
	}
};
*/

const postUser = (req, res, next) => {
    let data = req.body;
	if (data.hasOwnProperty('name') && data.hasOwnProperty('email')) {
        data.id = uniqid(); 
		users.push(data);
		res.status('201').json(`recibido con el id ${data.id}`);
	} else {
		res.status('400').json('fijate que le pifiaste a algun dato.');
	}
	next();
};

const getUserByid = (req, res, next) => {
	let resUser = users.find((e) => e.id === req.params.id);
	if (resUser) {
		res.json(resUser);
	} else {
		res.status(404).send('no encontramos al usuario');
	}
};

const deleteUser = (req, res, next) => {
	let userFound = users.find(e => e.id === req.params.id)
	let index = users.findIndex(e => e.id === req.params.id)
	if (userFound) {
		users.splice(index, 1)
		res.status('200').json('Se eliminó al empleado :(')
	} else {
		res.status('400').send('No se pudo eliminar al empleado')
	}
	next()
}

module.exports = { getUser, getUserByid, postUser, deleteUser };