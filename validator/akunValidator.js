const { check } = require("express-validator");
const UserModel = require("../models").user;

const akunValidator = [
  check("nama").isLength({ min: 1 }).withMessage("Nama wajib diisi"),
  check("tlp")
    .isNumeric()
    .withMessage("Harap gunakan nomor telepon")
    .custom((value) => {
      return UserModel.findOne({ where: { tlp: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "Nomor telah terdaftar, gunakan nomor lain atau login."
          );
        }
      });
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];

module.exports = { akunValidator };
