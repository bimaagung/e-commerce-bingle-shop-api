const { Item } = require("../models");

async function getAllItem(req, res) {
  try {
    const item = await Item.findAll();

    if (!item) {
      res.statusCode = 404;
      res.json({
        status: "fail",
        message: "Data tidak ditemukan",
        data: item,
      });
    } else {
      res.statusCode = 200;
      res.json({
        status: "success",
        message: "Success get all item",
        data: item,
      });
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: "fail",
      message: "Failed add data item",
    });

    console.log("Error get all Item : " + error.message);
  }
}

async function getItemById(req, res) {
  let id = req.params.id;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      res.statusCode = 404;
      res.json({
        status: "fail",
        message: "Data tidak ditemukan",
        data: item,
      });
    } else {
      res.statusCode = 200;
      res.json({
        status: "success",
        message: "Berhasil mengambil data item",
        data: item,
      });
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: "fail",
      message: "Gagal mengambil data item",
    });

    console.log("Error get by id Item : " + error.message);
  }
}

async function addItem(req, res) {
  try {
    const item = await Item.create(req.body);
    res.statusCode = 201;
    res.json({
      status: "success",
      message: "Berhasil menambah data item",
      data: item,
    });
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: "fail",
      message: "Gagal menambah data item",
    });

    console.log("Error Add Item : " + error.message);
  }
}

async function updateItem(req, res) {
  let id = req.params.id;

  try {
    let item = await Item.findByPk(id);

    if (!item) {
      res.statusCode = 404;
      res.json({
        status: "fail",
        message: "Data tidak ditemukan",
        data: item,
      });
    } else {
      item = await Item.create(req.body);
      res.statusCode = 200;
      res.json({
        status: "success",
        message: "Data item berhasil diupdate ",
        data: item,
      });
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: "fail",
      message: "Data item gagal diupdate",
    });

    console.log("Error update Item : " + error.message);
  }
}

async function deleteItem(req, res) {
  let id = req.params.id;

  try {
    let item = await Item.findByPk(id);

    if (!item) {
      res.statusCode = 404;
      res.json({
        status: "fail",
        message: "Data tidak ditemukan",
        data: item,
      });
    } else {
      item = await Item.destroy({
        where: {
          id: id,
        },
      });

      res.statusCode = 200;
      res.json({
        status: "success",
        message: "Berhasil menghapus data item",
      });
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: "fail",
      message: "Gagal menghapus data item",
    });

    console.log("Error delete Item : " + error.message);
  }
}

module.exports = { addItem, updateItem, deleteItem, getAllItem, getItemById };
