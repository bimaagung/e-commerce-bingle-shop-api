const { Order, Item, User } = require('../models');

const create_order = async (req, res, next) => {
  try {
    const id = req.body['itemId'];

    // Cross check ketersediaan stock pada item
    const check_stock = await Item.findOne({ where: { itemId: id } });

    if (check_stock.stock < 0) {
      res.status(404).json({
        status: 'failed',
        message: 'Stock item empty',
      });
    }

    const calculate_total_harga = check_stock.price * req.body.totalItem;

    const body_order = {
      userId: req.body.userId,
      itemId: req.body.itemId,
      totalItem: req.body.totalItem,
      totalPrice: calculate_total_harga,
    };

    // Memasukkan pesanan
    const insert_order = await Order.create(body_order);

    // Mengurangi jumlah stock pada item
    const reduce_stock = check_stock.stock - 1;

    // Menambah jumlah penjualan pada item
    const add_sold = check_stock.sold + 1;

    // Update jumlah stock dan penjualann pada pada item
    const update_stock = await Item.update(
      { stock: reduce_stock, sold: add_sold },
      { where: { itemId: id } },
    );

    const order_id = insert_order.orderId;

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

    res.status(201).json({
      status: 'ok',
      message: 'Success',
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
  } catch (error) {
    next(error);
  }
};

const update_status_order = async (req, res, next) => {
  try {
    const order_id = req.params['id'];

    const check_order = await Order.findOne({ where: { orderId: order_id } });

    if (!check_order) {
      return res.status(400).json({
        status: 'failed',
        message: 'Order not found',
      });
    }

    await Order.update({ status: 1 }, { where: { orderId: order_id } });

    res.status(200).json({
      status: 'ok',
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create_order, update_status_order };
