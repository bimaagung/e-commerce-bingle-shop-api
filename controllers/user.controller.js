const bcrypt = require('bcrypt');
const { User } = require('../models');

const register = async (req, res) => {
  try {
    const saltRounds = 10;
    const plaintTextPassword = req.body['password'];

    const salt = bcrypt.genSaltSync(saltRounds);
    const passHash = bcrypt.hashSync(plaintTextPassword, salt);

    const user = {
      name: req.body['name'],
      telp: req.body['telp'],
      email: req.body['email'],
      password: passHash,
      address: req.body['address'],
    };

    const checkUser = await User.findOne({ where: { email: user.email } });

    if (checkUser !== null) {
      res.statusCode = 400;
      return res.json({
        status: 'failed',
        message: 'Email already used',
      });
    }

    const item = await User.create(user);

    if (!item) {
      res.statusCode = 500;
      return res.json({
        status: 'failed',
        message: 'Server error',
      });
    }

    res.statusCode = 201;
    res.json({
      status: 'ok',
      message: 'success',
    });
  } catch (error) {
    res.statusCode = 500;
    return res.json({
      status: 'failed',
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const input_user = req.body;

    const user = await User.findOne({ where: { emil: input_user.email } });

    if (!user) {
      res.statusCode = 404;
      return res.json({
        status: 'failed',
        message: 'Data user not found',
      });
    }

    const check_password = bcrypt.compareSync(
      input_user.password,
      user.password,
    );

    if (!check_password) {
      res.statusCode = 400;
      return res.json({
        status: 'failed',
        message: 'Password not match',
      });
    }

    res.statusCode = 200;
    res.json({
      status: 'ok',
      message: 'success',
      data: user,
    });
  } catch (error) {
    res.statusCode = 500;
    return res.json({
      status: 'failed',
      message: error.message,
    });
  }
};
module.exports = { register, login };
