const express = require('express');
const router = express.Router();

const {
  authTokenAdminValidation,
} = require('../middleware/auth_token_validation');

const {
  categoryValidation,
  itemValidation,
} = require('../middleware/form_validation');

const adminController = require('../controllers/admin.controller');

// item

router.post(
  '/item/add',
  authTokenAdminValidation,
  itemValidation,
  adminController.addItem,
);

router.put(
  '/item/update/:id',
  authTokenAdminValidation,
  itemValidation,
  adminController.updateItem,
);

router.delete(
  '/item/delete/:id',
  authTokenAdminValidation,
  adminController.deleteItem,
);

// order

router.get('/order/', authTokenAdminValidation, adminController.getListOrder);

router.patch(
  '/order/update/:id',
  authTokenAdminValidation,
  adminController.updateStatusOrder,
);

// category
router.post(
  '/category/add',
  authTokenAdminValidation,
  categoryValidation,
  adminController.addCategory,
);

router.delete(
  '/category/delete/:id',
  authTokenAdminValidation,
  adminController.deleteCategory,
);

router.put(
  '/category/update/:id',
  authTokenAdminValidation,
  categoryValidation,
  adminController.updateCategory,
);

module.exports = router;
