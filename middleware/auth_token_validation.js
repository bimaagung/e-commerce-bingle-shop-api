require('dotenv').config();

const jwt = require('jsonwebtoken');
const res_data = require('../utils/response_data.util');

module.exports = {
  authTokenUserValidation: (req, res, next) => {
    let token = req.get('authorization');
    if (!token) {
      return res.json(res_data.failed('unauthorized user'));
    }

    // Delete "Bearer"
    token = token.slice(7);

    jwt.verify(token, process.env.JWT_KEY_SECRET, (err, decoded) => {
      if (err) {
        return res.json(res_data.failed('invalid token ....'));
      }

      if (decoded.result.is_admin === true) {
        return res.json(res_data.failed('unauthorized user'));
      }

      req.user = decoded;
      next();
    });
  },

  authTokenAdminValidation: (req, res, next) => {
    let token = req.get('authorization');
    if (!token) {
      return res.json(res_data.failed('unauthorized admin'));
    }

    // Delete "Bearer"
    token = token.slice(7);

    jwt.verify(token, process.env.JWT_KEY_SECRET, (err, decoded) => {
      if (err) {
        return res.json(res_data.failed('invalid token ....'));
      }

      if (decoded.result.is_admin === false) {
        return res.json(res_data.failed('unauthorized admin'));
      }

      req.user = decoded;
      next();
    });
  },
};
