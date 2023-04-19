const UserModel = require("../models").user;
const OutletModel = require("../models").outlet;
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    let body = req.body;

    body.password = await bcrypt.hashSync(body.password, 10);
    const user = await UserModel.create(body);
    console.log(user);

    res.status(201).json({
      status: "Berhasil",
      messege: "Register Akun ngeKAS Berhasil",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const registerOutlet = async (req, res) => {
  try {
    let { nama, userId } = req.body;
    const outlet = await OutletModel.create({ outlet: nama, userId: userId });
    console.log(outlet);
    res.status(201).json({
      status: "Berhasil",
      messege: "Register Outlet ngeKAS Berhasil",
      outletKamu: outlet.id,
      namaOutlet: outlet.outlet,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const login = async (req, res) => {
  try {
    const { tlp, password } = req.body;
    // CEK EMAIL DULU ADAA ATAU NGGAK
    const dataUser = await UserModel.findOne({
      where: {
        tlp: tlp,
      },
    });
    // CEK EMAIL DAN PASSWORD HARUS SAMA DARI DATABASE
    // CEK EMAILNYA
    if (dataUser === null) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Anda Belum Terdaftar Di Data ngeKAS",
      });
    }
    // CEK PASSWORDNYA
    const verify = bcrypt.compareSync(password, dataUser.password);
    if (!verify) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Password Tidak Sama",
      });
    }

    return res.json({
      status: "Berhasil",
      messsege: `Anda Berhasil Login ngeKAS Dengan Nomor ${tlp}`,
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const verify = async (req, res) => {
  try {
    const { password } = req.body;
    const { idUser } = req.query;
    const dataUser = await UserModel.findOne({
      where: {
        id: idUser,
      },
    });
    const verify = bcrypt.compareSync(password, dataUser.password);
    if (!verify) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Password Tidak Sama",
      });
    }

    return res.json({
      status: "Berhasil",
      messsege: `Password Sesuai`,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};
const detailUser = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const dataDetail = await UserModel.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: OutletModel,
          require: true,
          as: "outlet",
          attributes: ["id", "outlet", "userId"],
        },
      ],
    });
    if (dataDetail === null) {
      return res.json({
        status: "`Gagal",
        messege: `Data User Id ${id} Tidak Ditemukan`,
      });
    }
    return res.json({
      status: "Berhasil",
      messege: `Berikut Data Detail User Ber Id ${id}`,
      data: dataDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const perbaruiUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, tlp, password } = req.body;
    const dataDetail = await UserModel.findByPk(id);
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }

    await UserModel.update(
      { nama: nama, tlp: tlp, password: password },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const indexOutlet = async (req, res) => {
  try {
    const { idUser } = req.query;
    const dataOutlet = await OutletModel.findAll({
      where: { userId: idUser },
    });
    return res.json({
      status: "Berhasil",
      messege: `Berikut Daftar Outlet Dari User ${idUser}`,
      data: dataOutlet,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};
const detailOutlet = async (req, res) => {
  try {
    const { id } = req.params;

    const { idUser } = req.query;
    const dataDetail = await OutletModel.findAll({
      where: {
        id: id,
        userId: idUser,
      },
    });
    if (dataDetail === null || dataDetail === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data Outlet Tidak Ditemukan",
      });
    }

    return res.json({
      status: "Berhasil",
      messege: "Data Outlet Berhasil Ditemukan",
      data: dataDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const hapusOutlet = async (req, res) => {
  try {
    const { id } = req.params;
    const { idUser } = req.query;
    const dataOutlet = await OutletModel.destroy({
      where: {
        id: id,
        userid: idUser,
      },
    });
    if (dataOutlet === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data Outlet Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Outlet Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const perbaruiOutlet = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, userId } = req.body;
    const { idUser } = req.query;
    const dataDetail = await OutletModel.findAll({
      where: {
        id: id,
        userId: idUser,
      },
    });
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }

    await OutletModel.update(
      { outlet: nama, userId: userId },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

module.exports = {
  register,
  registerOutlet,
  login,
  verify,
  detailUser,
  perbaruiUser,
  indexOutlet,
  detailOutlet,
  hapusOutlet,
  perbaruiOutlet,
};
