const { Order } = require('../models');

class orderController {
  static create_order = async (req, res) => {
    try {
      const { item_id } = req.body;

      // Cross check ketersediaan stock pada item
      const check_stock = await Order.findByPk(item_id);
      if (check_stock.stock > 0) {
        // Memasukkan pesanan
        const order = await Order.create(req.body);

        // Mengurangi jumlah stock pada item
        const reduce_stock = check_stock.stock - 1;
        // Menambah jumlah penjualan pada item
        const add_sold = check_stock.sold + 1;
        // Update jumlah stock dan penjualann pada pada item
        const update_stock = await Order.update(
          { stock: reduce_stock, sold: add_sold },
          { where: { id: item_id } },
        );

        if (order === true && update_stock === true) {
          res.statusCode = 201;
          res.json({
            status: 'success',
            message: 'Berhasil membuat pesanan',
            data: order,
          });
        } else {
          res.statusCode = 400;
          res.json({
            status: 'fail',
            message: 'Gagal membuat pesanan',
          });
        }
      } else {
        res.statusCode = 400;
        res.json({
          status: 'fail',
          message: 'Stock item kosong',
        });
      }
    } catch (error) {
      res.statusCode = 400;
      res.json({
        status: 'fail',
        message: 'Gagal membuat pesanan',
      });

      console.log(`Error create order : ${error.message}`);
    }
  };
}

module.exports = orderController;
