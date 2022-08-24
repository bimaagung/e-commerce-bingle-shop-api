const joi = require('joi');
const res_data = require('../utils/response_data.util');

const registerValidation = async (req, res, next) => {
  const response = joi
    .object({
      name: joi.string().required(),
      telp: joi.required(),
      address: joi.string().required(),
      username: joi.string().required(),
      password: joi.string().required(),
    })
    .validate(req.body);

  if (response.error) {
    return res
      .status(400)
      .json(res_data.failed(response.error.details[0].message));
  }

  next();
};

const loginValidation = async (req, res, next) => {
  const response = joi
    .object({
      username: joi.string().required(),
      password: joi.string().required(),
    })
    .validate(req.body);

  if (response.error) {
    return res
      .status(400)
      .json(res_data.failed(response.error.details[0].message));
  }

  next();
};

const categoryValidation = async (req, res, next) => {
  const response = joi
    .object({
      name: joi.string().required(),
    })
    .validate(req.body);

  if (response.error) {
    return res
      .status(400)
      .json(res_data.failed(response.error.details[0].message));
  }

  next();
};

const itemValidation = async (req, res, next) => {
  const response = joi
    .object({
      name: joi.string().required(),
      category_id: joi.number().required(),
      stock: joi.number().required(),
      price: joi.number().required(),
    })
    .validate(req.body);

  if (response.error) {
    return res
      .status(400)
      .json(res_data.failed(response.error.details[0].message));
  }

  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  categoryValidation,
  itemValidation,
};
