const express = require('express');
const path = require('path');

const users = require('../api/users');
const router = express.Router();

// PAGES ROUTES //
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'));
});

// API ROUTES //

router.get('/api/users', users.getUser);
router.get('/api/users/:id', users.getUserByid);
router.post('/api/users', users.postUser);
router.delete('/api/users/:id', users.deleteUser);


// NOT FOUNS HANDLER //
router.use((req, res) => {
	res.status(404).send('pifiaste wache');
});

module.exports = router;