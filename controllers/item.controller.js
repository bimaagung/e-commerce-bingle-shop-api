const { Item } = require('../models');

const get_all_item = async (req, res) => {
  try {
    const item = await Item.findAll();

    if (!item) {
      res.statusCode = 404;
      res.json({
        status: 'fail',
        message: 'Data tidak ditemukan',
        data: item,
      });
    } else {
      res.statusCode = 200;
      res.json({
        status: 'success',
        message: 'Success get all item',
        data: item,
      });
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: 'fail',
      message: 'Failed add data item',
    });

    console.log(`Error get all Item : ${error.message}`);
  }
};

const get_item_by_id = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findOne({ where: { itemId } });

    if (!item) {
      res.statusCode = 404;
      res.json({
        status: 'fail',
        message: 'Data tidak ditemukan',
        data: item,
      });
    } else {
      res.statusCode = 200;
      res.json({
        status: 'success',
        message: 'Berhasil mengambil data item',
        data: item,
      });
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: 'fail',
      message: 'Gagal mengambil data item',
    });

    console.log(`Error get by id Item : ${error.message}`);
  }
};

// TODO : Remove property sold

const add_item = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.statusCode = 201;
    res.json({
      status: 'success',
      message: 'Berhasil menambah data item',
      data: item,
    });
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: 'fail',
      message: 'Gagal menambah data item',
    });

    console.log(`Error Add Item : ${error.message}`);
  }
};

const update_item = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findOne({ where: { itemId } });

    if (!item) {
      res.statusCode = 404;
      res.json({
        status: 'fail',
        message: 'Data tidak ditemukan',
        data: item,
      });
    } else {
      await Item.update(req.body, {
        where: {
          itemId,
        },
      });
      res.statusCode = 200;
      res.json({
        status: 'success',
        message: 'Data item berhasil diupdate ',
        data: item,
      });
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: 'fail',
      message: 'Data item gagal diupdate',
    });

    console.log(`Error update Item : ${error.message}`);
  }
};

const delete_item = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findOne({ where: { itemId } });

    if (!item) {
      res.statusCode = 404;
      res.json({
        status: 'fail',
        message: 'Data tidak ditemukan',
        data: item,
      });
    } else {
      await Item.destroy({
        where: {
          itemId,
        },
      });

      res.statusCode = 200;
      res.json({
        status: 'success',
        message: 'Berhasil menghapus data item',
      });
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: 'fail',
      message: 'Gagal menghapus data item',
    });

    console.log(`Error delete Item : ${error.message}`);
  }
};

module.exports = {
  get_all_item,
  get_item_by_id,
  add_item,
  update_item,
  delete_item,
};
