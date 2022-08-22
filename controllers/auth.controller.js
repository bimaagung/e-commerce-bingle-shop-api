const bcrypt = require('bcrypt');
const { Customer } = require('../models');
const user_uc = require('../usecase/user');
const res_data = require('../utils/response_data.util');

const register = async (req, res, next) => {
  try {
    const user = {
      name: req.body.name,
      telp: req.body.telp,
      address: req.body.address,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      is_admin: false,
    };

    // get username by username in db
    const get_user_by_username = await user_uc.getUserByUsername(user.username);

    // check username is existing
    if (get_user_by_username !== null) {
      return res
        .status(400)
        .json(res_data.failed('Username already exists', null));
    }

    // create user in db
    await user_uc.createUser(user);

    // delete password in object user
    delete user['password'];

    // success create user
    res.status(201).json(res_data.success(user));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };

    //get customer by username in db
    const get_user = await user_uc.getUserByUsername(user.username);

    // check username is incorrect
    if (!get_user) {
      return res
        .status(400)
        .json(res_data.failed('incorrect username or password', null));
    }

    //compare password bycript and password (body req)
    const check_password = bcrypt.compareSync(user.password, get_user.password);

    // check password is incorrect
    if (!check_password) {
      return res
        .status(400)
        .json(res_data.failed('incorrect username or password', null));
    }

    // response data user
    let res_data_user = {
      name: get_user.name,
      telp: get_user.telp,
      address: get_user.address,
      username: get_user.username,
      is_admin: get_user.is_admin,
    };

    //login success
    res.json(res_data.success(res_data_user));
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
