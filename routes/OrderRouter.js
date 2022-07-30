const express = require('express');
const orderController = require('../controllers/OrderController');

const router = express.Router();

router.post('/', orderController.create_order);
router.put('/update_status_order/:id', orderController.update_status_order);

module.exports = router;
