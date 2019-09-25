const express = require('express');
const path = require('path');
const employees = require('../api/employees');
const router = express.Router();

//pages routes

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'));
});

router.get('/home', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'))
})

//api routes
router.get('/api/employees', employees);
//router.get('/api/employees', employees.getEmployee); 
//router.get('/api/employeesData/:id', employees.getEmployeeByid);
//router.post('/api/employees', employees.postEmployee);

// not found status
router.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, '../pages/404.html'));
});

module.exports = router;