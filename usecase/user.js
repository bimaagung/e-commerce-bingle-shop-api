const { User } = require('../models');

module.exports = {
  createUser: async (user) => await User.create(user),
  getUserById: async (id) => await User.findOne({ where: id }),
  getUserByUsername: async (username) =>
    await User.findOne({ where: { username: username } }),
  updateUser: async (id, option) =>
    await User.update(option, { where: { id: id } }),
};
