const express = require('express');
const router = express.Router();

const {
  authTokenUserValidation,
} = require('../middleware/auth_token_validation');

const {
  changePasswordValidation,
  updateUserValidation,
} = require('../middleware/form_validation');

const userController = require('../controllers/user.controller');

router.patch(
  '/change-password/:id',
  authTokenUserValidation,
  changePasswordValidation,
  userController.changePassword,
);

router.put(
  '/update/:id',
  authTokenUserValidation,
  updateUserValidation,
  userController.updateUser,
);

module.exports = router;
