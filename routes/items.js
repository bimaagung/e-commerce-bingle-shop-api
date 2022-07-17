var express = require("express");
const {
  addItem,
  updateItem,
  deleteItem,
  getAllItem,
  getItemById,
} = require("../controllers/items.controller");
var router = express.Router();

router.get("/env", function (req, res, next) {
  res.send(process.env.APP_NAME);
});

router.get("/", getAllItem);

router.get("/:id", getItemById);

router.post("/", addItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

module.exports = router;
