const bcrypt = require('bcrypt');
const { Customer } = require('../models');

const register = async (req, res, next) => {
  try {
    const customer_req = req.body;
    // Convert plan text password ke hash_bycrypt
    const salt_rounds = 10;
    const plaint_text_password = customer_req['password'];

    const salt = bcrypt.genSaltSync(salt_rounds);
    const pass_hash = bcrypt.hashSync(plaint_text_password, salt);

    customer_req.pass_hash = pass_hash;

    //check username sudah ada atau belum
    const check_username = await Customer.findOne({
      where: { username: customer_req['username'] },
    });

    if (check_username !== null) {
      // username sudah ada
      return res.status(400).json({
        status: 'failed',
        message: 'Username already used',
      });
    }

    // Memasukkan data customer
    await Customer.create({
      name: customer_req.name,
      telp: customer_req.telp,
      username: customer_req.username,
      password: customer_req.pass_hash,
      address: customer_req.address,
    });

    res.status(201).json({
      status: 'ok',
      message: 'success',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const customer_req = req.body;

    //get customer by username
    const find_customer = await Customer.findOne({
      where: { username: customer_req['username'] },
    });

    // check username existing
    if (!find_customer) {
      return res.status(404).json({
        status: 'failed',
        message: 'Customer not found',
      });
    }

    //compare password bycript and password (body req)
    const check_password = bcrypt.compareSync(
      customer_req.password,
      find_customer.password,
    );

    //check password false
    if (!check_password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Password not match',
      });
    }

    //login success
    res.status(200).json({
      status: 'ok',
      message: 'success',
      data: find_customer,
    });
  } catch (error) {
    next(error);
  }
};

const update_password = async (req, res, next) => {
  try {
    //get id customer by params
    const customer_id = req.params['customerId'];

    //get value password by req body
    const plaint_text_password = req.body['password'];

    // Convert plan text password ke hash_bycrypt
    const salt_rounds = 10;
    const salt = bcrypt.genSaltSync(salt_rounds);
    const pass_hash = bcrypt.hashSync(plaint_text_password, salt);

    //update password customer in db
    const update_password = await Customer.update(
      { password: pass_hash },
      { where: { customerId: customer_id } },
    );

    console.log(update_password);

    //customer not found
    if (update_password < 1) {
      return res.status(400).json({
        status: 'failed',
        message: 'Customer not found',
      });
    }

    //success update password
    res.status(200).json({
      status: 'ok',
      message: 'success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, update_password };
