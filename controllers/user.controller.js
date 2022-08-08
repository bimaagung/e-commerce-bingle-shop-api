const bcrypt = require('bcrypt');
const { User } = require('../models');

const register = async (req, res, next) => {
  try {
    const salt_rounds = 10;
    const plaint_text_password = req.body['password'];

    const salt = bcrypt.genSaltSync(salt_rounds);
    const pass_hash = bcrypt.hashSync(plaint_text_password, salt);

    const user = {
      name: req.body['name'],
      telp: req.body['telp'],
      email: req.body['email'],
      password: pass_hash,
      address: req.body['address'],
    };

    const check_user = await User.findOne({ where: { email: user['email'] } });

    if (check_user !== null) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email already used',
      });
    }

    await User.create(user);

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
    const input_user = req.body;

    const user = await User.findOne({ where: { email: input_user.email } });

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    const check_password = bcrypt.compareSync(
      input_user.password,
      user.password,
    );

    if (!check_password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Password not match',
      });
    }

    res.status(200).json({
      status: 'ok',
      message: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
