const express = require('express');

const router = express.Router();
const usersController = require('../controllers/user.controller');

router.post('/', usersController.login);
router.post('/register', usersController.register);

module.exports = router;
