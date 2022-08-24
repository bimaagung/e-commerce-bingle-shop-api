const bcrypt = require('bcrypt');
const user_uc = require('../usecase/user');
const res_data = require('../utils/response_data.util');

const changePassword = async (req, res, next) => {
  try {
    //get id user by params
    const user_id = parseInt(req.params['id']);

    // Convert plan text password ke hash_bycrypt
    const password = bcrypt.hashSync(req.body['password'], 10);

    let option = { password: password };

    //update password in db
    const update_password = await user_uc.updateUser(user_id, option);

    // user not found
    if (update_password < 1) {
      return res.status(400).json(res_data.failed('user not found'));
    }

    //success update password
    res.status(200).json(res_data.success());
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    //get id user by params
    const user_id = parseInt(req.params['id']);

    let user = {
      name: req.body.name,
      telp: req.body.telp,
      address: req.body.address,
    };

    //update user in db
    const update_password = await user_uc.updateUser(user_id, user);

    // user not found
    if (update_password < 1) {
      return res.status(400).json(res_data.failed('user not found'));
    }

    //success update user
    res.status(200).json(res_data.success(user));
  } catch (error) {
    next(error);
  }
};

module.exports = { changePassword, updateUser };
