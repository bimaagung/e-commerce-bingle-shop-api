const express = require('express');
const router = express.Router();

const {
  authTokenUserValidation,
} = require('../middleware/auth_token_validation');

const orderController = require('./../controllers/order.controller');

// Order
router.get(
  '/:id',
  authTokenUserValidation,
  orderController.getPendingOrderByUserId,
);
router.post(
  '/create/:id',
  authTokenUserValidation,
  orderController.createOrder,
);
router.patch(
  '/submit/:id',
  authTokenUserValidation,
  orderController.statusSubmittedOrder,
);

module.exports = router;
