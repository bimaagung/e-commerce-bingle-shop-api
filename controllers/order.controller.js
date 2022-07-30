const { Order, Item, User } = require('../models');

class orderController {
  static create_order = async (req, res) => {
    try {
      const id = req.body.itemId;

      // Cross check ketersediaan stock pada item
      const check_stock = await Item.findOne({ where: { itemId: id } });

      if (check_stock.stock > 0) {
        const calculate_total_harga = check_stock.price * req.body.totalItem;

        const body_order = {
          userId: req.body.userId,
          itemId: req.body.itemId,
          totalItem: req.body.totalItem,
          totalPrice: calculate_total_harga,
        };
        // Memasukkan pesanan
        const create_order = await Order.create(body_order);

        // Mengurangi jumlah stock pada item
        const reduce_stock = check_stock.stock - 1;
        // Menambah jumlah penjualan pada item
        const add_sold = check_stock.sold + 1;
        // Update jumlah stock dan penjualann pada pada item
        const update_stock = await Item.update(
          { stock: reduce_stock, sold: add_sold },
          { where: { itemId: id } },
        );

        if (create_order) {
          if (update_stock) {
            const order_id = create_order.orderId;
            const order_by_id = await Order.findOne({
              where: { orderId: order_id },
              include: [
                {
                  model: User,
                },
                {
                  model: Item,
                },
              ],
            });
            res.statusCode = 201;
            res.json({
              status: 'success',
              message: 'Berhasil membuat pesanan',
              data: {
                id: order_by_id.orderId,
                name: order_by_id.User.name,
                address: order_by_id.User.address,
                item: order_by_id.Item.name,
                total_item: order_by_id.totalItem,
                total_price: order_by_id.totalPrice,
                status: order_by_id.status,
                createdAt: order_by_id.createdAt,
                updatedAt: order_by_id.updatedAt,
              },
            });
          } else {
            res.statusCode = 400;
            res.json({
              status: 'fail',
              message: 'Gagal update stock item',
            });
          }
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
        message: 'Fungsi create order error',
      });

      console.log(`Error create order : ${error.message}`);
    }
  };
}

module.exports = orderController;
