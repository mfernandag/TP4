const employees = [{
    'name': 'Bruce Wayne', 'email': 'bruce@wayneenterprises.com', 'adress': 'Gotham ', 'phone': '1190984864'
}];

const getEmployees = (req, res, next) => {
	res.json({ employees });
	next();
};

module.exports = getEmployees;