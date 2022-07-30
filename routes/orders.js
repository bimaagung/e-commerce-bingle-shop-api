const express = require('express');
const ordersController = require('../controllers/order.controller');

const router = express.Router();

router.post('/', ordersController.create_order);

router.put('/update_status_order/:id', ordersController.update_status_order);

module.exports = router;
