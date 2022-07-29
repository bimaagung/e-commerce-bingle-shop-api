const express = require('express');
const ordersController = require('../controllers/order.controller');

const router = express.Router();

router.post('/', ordersController.create_order);

// router.put('/:id', ordersController.update_status);

module.exports = router;
