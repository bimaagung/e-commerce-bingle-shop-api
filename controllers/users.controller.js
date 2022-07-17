const { User } = require("../models");
const bcrypt = require("bcrypt");

async function register(req, res) {
  try {
    const saltRounds = 10;
    const plaintTextPassword = req.body.password;

    const salt = bcrypt.genSaltSync(saltRounds);
    const passHash = bcrypt.hashSync(plaintTextPassword, salt);

    let user = {
      name: req.body.name,
      telp: req.body.telp,
      email: req.body.email,
      password: passHash,
      address: req.body.address,
    };

    const item = await User.create(user);
    res.statusCode = 201;
    res.json({
      status: "success",
      message: "Berhasil melakukan pendaftaran",
      data: item,
    });
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: "fail",
      message: "Gagal melakukan pendaftaran",
    });

    console.log("Error Register User : " + error.message);
  }
}

module.exports = { register };
