const express = require('express');
const router = express.Router();

const {
  registerValidation,
  loginValidation,
} = require('../middleware/form_validation');

const authController = require('../controllers/auth.controller');

router.post('/login', loginValidation, authController.login);
router.post('/register', registerValidation, authController.register);
router.put('/user/change_password/:customerId', authController.update_password);

module.exports = router;
