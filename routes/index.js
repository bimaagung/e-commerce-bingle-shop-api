const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const categoryController = require('../controllers/category.controller');
const itemController = require('../controllers/item.controller');
const adminController = require('../controllers/admin.controller');
const orderController = require('./../controllers/order.controller');

// home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Customer
router.post('/user/login', authController.login);
router.post('/user/register', authController.register);
router.put('/user/change_password/:customerId', authController.update_password);

//Category
router.get('/category', categoryController.getListCategory);
router.get('/category/detail/:id', categoryController.getCategoryById);

//Item
router.get('/item', itemController.getListItem);
router.get('/item/detail/:id', itemController.getItemById);

// Admin
router.post('/admin/item/add', adminController.addItem);
router.put('/admin/item/update/:id', adminController.updateItem);
router.delete('/admin/item/delete/:id', adminController.deleteItem);

router.get('/admin/order/', adminController.getListOrder);
router.patch('/admin/order/update/:id', adminController.updateStatusOrder);

router.post('/admin/category/add', adminController.addCategory);
router.delete('/admin/category/delete/:id', adminController.deleteCategory);
router.put('/admin/category/update/:id', adminController.updateCategory);

// Order
router.get('/order/:id', orderController.getPendingOrderByUserId);
router.post('/order/create/:id', orderController.createOrder);
router.patch('/order/submit/:id', orderController.statusSubmittedOrder);

module.exports = router;
