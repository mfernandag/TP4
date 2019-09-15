const express = require('express');
const path = require('path');
const employees = require('../api/employees');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'));
});

router.get('/api/employees', employees);

//router.get('/api/employeesData', employees.getEmployee); //crear esa employees list
//router.get('/api/employeesData/:id', employees.getEmployee);
//router.post('/api/employeesData', employees.postEmployee);

// not found status
router.use((req, res) => {
	res.status(404).send('Oops, 404 error. PAGE NOT FOUND');
});


module.exports = router;