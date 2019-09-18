const express = require('express');
const path = require('path');
const employees = require('../api/employees');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'));
});

router.get('/api/employees', employees);
router.get('/api/employees', employees.getEmployee); 
router.get('/api/employeesData/:id', employees.getEmployeeByid);
router.post('/api/employees', employees.postEmployee);

// not found status
router.use((req, res) => {
	res.status(404).send('Oops, 404 error. PAGE NOT FOUND');
});


module.exports = router;