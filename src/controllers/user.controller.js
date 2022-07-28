const bcrypt = require('bcrypt');
const { User } = require('../models');

class userController {
  static register = async (req, res) => {
    try {
      const saltRounds = 10;
      const plaintTextPassword = req.body.password;

      const salt = bcrypt.genSaltSync(saltRounds);
      const passHash = bcrypt.hashSync(plaintTextPassword, salt);

      const user = {
        name: req.body.name,
        telp: req.body.telp,
        email: req.body.email,
        password: passHash,
        address: req.body.address,
      };

      const checkUser = await User.findOne({ where: { email: user.email } });

      if (checkUser !== null) {
        res.statusCode = 400;
        res.json({
          status: 'fail',
          message: 'Email sudah digunakan',
        });
      } else {
        const item = await User.create(user);
        res.statusCode = 201;
        res.json({
          status: 'success',
          message: 'Berhasil melakukan pendaftaran',
          data: {
            id: item.id,
            name: item.name,
            telp: item.telp,
            email: item.email,
            address: item.address,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          },
        });
      }
    } catch (error) {
      res.statusCode = 400;
      res.json({
        status: 'fail',
        message: 'Gagal melakukan pendaftaran',
      });

      console.log(`Error Register User : ${error.message}`);
    }
  };

  static login = async (req, res) => {
    try {
      const user = req.body;

      // Memeriksa user sudah terdaftar atau belum
      const check_user = await User.findOne({ where: { email: user.email } });

      // Kondisi ketika user terdaftar
      if (check_user) {
        // Menyesuaikan password sudah di bcrypt dan sebelum di bycript
        const check_password = bcrypt.compareSync(
          user.password,
          check_user.password,
        );

        console.log(check_user);

        // Kondisi ketika password sama antara password request dari user dan password ada di db
        if (check_password) {
          res.statusCode = 200;
          res.json({
            status: 'success',
            message: 'Berhasil login',
            data: {
              id: check_user.id,
              name: check_user.name,
              telp: check_user.telp,
              email: check_user.email,
              address: check_user.address,
              createdAt: check_user.createdAt,
              updatedAt: check_user.updatedAt,
            },
          });
        } else {
          res.statusCode = 400;
          res.json({
            status: 'fail',
            message: 'Password tidak sesuai',
          });
        }
      } else {
        res.statusCode = 404;
        res.json({
          status: 'fail',
          message: 'Data user tidak ditemukan',
        });
      }
    } catch (error) {
      res.statusCode = 400;
      res.json({
        status: 'fail',
        message: 'Gagal login user',
      });

      console.log(`Error login user : ${error.message}`);
    }
  };
}

module.exports = userController;
