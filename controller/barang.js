const BarangModel = require("../models").barang;
const DataBarangTransaksiModel = require("../models").buBarang;

const tambahBarang = async (req, res) => {
  try {
    // let {
    //   barang,
    //   hargaAwal,
    //   hargaJual,
    //   outletId,
    //   stokBarang,
    //   kodeBarang,
    //   foto,
    // } = req.body;
    let body = req.body;
    // return res.send(body);
    const dataBarang = await BarangModel.create(body);
    const dataBU = await DataBarangTransaksiModel.create({
      barang: body.barang,
      hargaAwal: body.hargaAwal,
      hargaJual: body.hargaJual,
      outletId: body.outletId,
      kodeBarang: body.kodeBarang,
      foto: body.foto,
    });

    console.log(dataBarang);
    console.log(dataBU);
    res.status(201).json({
      status: "Berhasil",
      messege: "Tambah Barang ngeKAS Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const indexBarang = async (req, res) => {
  try {
    const { idOutlet } = req.query;
    const dataProduk = await BarangModel.findAndCountAll({
      where: {
        outletId: idOutlet,
      },
      //   where: {
      //     /// SEARCHING
      //     [Op.or]: [
      //       {
      //         name: {
      //           [Op.like]: `%${keyword}%`,
      //         },
      //       },
      //       {
      //         Produkname: {
      //           [Op.like]: `%${keyword}%`,
      //         },
      //       },
      //       {
      //         role: {
      //           [Op.like]: `%${keyword}%`,
      //         },
      //       },
      //     ],
      //   },
      //   order: [[sortBy, orderBy]],
      //   offset: page, //mulai dari +1
      //   limit: pageSize, // banyak da
    });

    return res.json({
      status: "Berhasil",
      messege: `Berikut Daftar Barang Dari Outlet ${idOutlet}`,
      data: dataProduk,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const detailBarang = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const { idOutlet } = req.query;
    const dataDetail = await BarangModel.findAll({
      where: {
        id: id,
        outletId: idOutlet,
      },
    });
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data Barang Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Berikut Data Detail Barang",
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

const hapusBarang = async (req, res) => {
  try {
    const { id } = req.params;

    const dataDetail = await BarangModel.destroy({
      where: {
        id: id,
      },
    });
    if (dataDetail === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data Barang Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Barang Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};
const perbaruiBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { idOutlet } = req.query;
    const { barang, hargaAwal, hargaJual, stokBarang, kodeBarang, foto } =
      req.body;
    const dataDetail = await BarangModel.findByPk(id);

    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data Barang Tidak Ditemukan",
      });
    }

    await BarangModel.update(
      {
        barang: barang,
        hargaAwal: hargaAwal,
        hargaJual: hargaJual,
        stokBarang: stokBarang,
        kodeBarang: kodeBarang,
        foto: foto,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "Produk Berhasil Diupdate",
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

module.exports = {
  tambahBarang,
  indexBarang,
  perbaruiBarang,
  hapusBarang,
  detailBarang,
};
