const TransaksiModel = require("../models").transaksi;
const DetailTransaksiModel = require("../models").detailTransaksi;
const HutangModel = require("../models").hutang;
const BarangModel = require("../models").barang;
const DataBarangTransaksiModel = require("../models").buBarang;
const CicilanModel = require("../models").cicilan;

const tambahTransaksi = async (req, res) => {
  try {
    let {
      pembeli,
      nominalJual,
      nominalAwal,
      transaksi,
      outletId,
      lunas,
      tempo,
      payloadDetail,
    } = req.body;
    // let body = req.body;
    // for (i = 0; i < payloadDetail.length; i++) {
    //   const element = payloadDetail[i];
    //   return res.send(element);
    // }
    // return;
    // await Promise.all(
    //   payloadDetail.map(async (dataa) => {
    //     console.log(dataa);

    //     const dataDetailTrans = await DetailTransaksiModel.create({
    //       barangId: dataa.id,
    //       trasaksiId: 1,
    //       jumlah: dataa.stok,
    //     });

    //     return res.send(dataDetailTrans);
    //   })
    // );
    // // );
    // return;
    // return res.send(body);

    const dataTransaksi = await TransaksiModel.create({
      pembeli: pembeli,
      nominalAwal: nominalAwal,
      nominalJual: nominalJual,
      transaksi: transaksi,
      outletId: outletId,
      lunas: lunas,
    });

    // return res.send(transid);
    await Promise.all(
      payloadDetail.map(async (dataa) => {
        const dataDetailTrans = await DetailTransaksiModel.create({
          barangId: dataa.id,
          transaksiId: dataTransaksi.id,
          jumlah: dataa.stok,
        });

        const dataBarang = await BarangModel.findByPk(dataa.id);
        await BarangModel.update(
          {
            stokBarang: dataBarang.stokBarang - dataa.stok,
          },
          {
            where: {
              id: dataa.id,
            },
          }
        );
      })
    );

    if (lunas === "BELUM LUNAS") {
      const buatHutang = await HutangModel.create({
        penghutang: pembeli,
        lunas: lunas,
        sisa: nominalJual,
        nominal: nominalJual,
        tempo: tempo,
        transaksiId: dataTransaksi.id,
      });
      console.log(buatHutang);
    }

    console.log(dataTransaksi);
    res.status(200).json({
      status: "Berhasil",
      messege: "Tambah Transaksi ngeKAS Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const indexTransaksi = async (req, res) => {
  try {
    const { idOutlet } = req.query;
    const dataProduk = await TransaksiModel.findAll({
      where: { outletId: idOutlet },
      include: [
        {
          model: DataBarangTransaksiModel,
          require: true,
          as: "barang",
          attributes: ["id", "barang", "hargaJual"],
          through: {
            attributes: ["barangId", "transaksiId", "jumlah"],
          },
        },
      ],
    });

    return res.json({
      status: "Berhasil",
      messege: `Berikut Daftar Transaksi Dari Outlet ${idOutlet}`,
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

const detailTransaksi = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const { idOutlet } = req.query;
    const dataDetail = await TransaksiModel.findAll({
      where: {
        id: id,
        outletId: idOutlet,
      },
    });
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data Transaksi Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Berikut Data Detail Transaksi",
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

const hapusTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const { idOutlet } = req.query;
    const dataDetail = await TransaksiModel.destroy({
      where: {
        id: id,
        outletId: idOutlet,
      },
    });
    if (dataDetail === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data Transaksi Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Transaksi Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};
const perbaruiTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const { idOutlet } = req.query;
    const {
      // pembeli,nominalJual,nominalAwal,transaksi,outletId,lunas
    } = req.body;
    const dataDetail = await TransaksiModel.findAll({
      where: {
        id: id,
        outletId: idOutlet,
      },
    });
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data Barng Tidak Ditemukan",
      });
    }

    await TransaksiModel.update(
      {
        pembeli: pembeli,
        nominalJual: nominalJual,
        nominalAwal: nominalAwal,
        transaksi: transaksi,
        outletId: outletId,
        lunas: lunas,
      },
      {
        where: {
          id: id,
          outletId: idOutlet,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "Produk Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

// const cicilHutang = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { idOutlet } = req.query;
//     const dataHutangCicil = await CicilanModel.create({
//       hutangId:
//     })
//   } catch (error) {
//     console.log(error);
//     res.status(403).json({
//       status: "Gagal",
//       messege: "Ada Kesalahan",
//     });
//   }
// };

const indexHutang = async (req, res) => {
  try {
    const { idOutlet } = req.query;
    const dataHutang = await HutangModel.findAll({
      include: [
        {
          model: CicilanModel,
          require: true,
          as: "cicilan",
        },
      ],
    });
    return res.json({
      status: "Berhasil",
      messege: `Berikut Hutang Dari Outlet ${idOutlet}`,
      data: dataHutang,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const hutangDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { idOutlet } = req.query;
    const dataHutang = await HutangModel.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: CicilanModel,
          require: true,
          as: "cicilan",
        },
      ],
    });
    return res.json({
      status: "Berhasil",
      messege: `Berikut Hutang Dari Outlet ${idOutlet}`,
      data: dataHutang,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};
const cicilHutang = async (req, res) => {
  try {
    const { id } = req.params;
    const { bayar } = req.body;
    const dataHutangNow = await HutangModel.findByPk(id);
    if (bayar >= dataHutangNow.sisa) {
      await HutangModel.update(
        {
          lunas: "LUNAS",
          sisa: 0,
        },
        {
          where: {
            id: id,
          },
        }
      );
      await TransaksiModel.update(
        {
          lunas: "LUNAS",
        },
        {
          where: {
            id: dataHutangNow.transaksiId,
          },
        }
      );
    }
    const dataCicil = await CicilanModel.create({
      hutangId: id,
      bayar: bayar,
    });
   

    await HutangModel.update(
      {
        sisa: dataHutangNow.sisa - bayar,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.json({
      status: "Berhasil",
      messege: `Berhasil mencicil hutang dari id ${id}`,
      data: dataCicil,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const lunaskan = async (req, res) => {
  try {
    const { id } = req.params;
    const { lunas } = req.body;
    const dataHutang = await HutangModel.update(
      {
        lunas: lunas,
        sisa: 0,
      },
      {
        where: {
          transaksiId: id,
        },
      }
    );

    const dataLunas = await CicilanModel.update(
      {
        bayar: dataHutang.sisa,
      },
      {
        where: {
          hutangId: id,
        },
      }
    );
    // if (dataLunas === 0 || dataLunas === null || dataLunas === undefined)
    //   await CicilanModel.create({
    //     bayar: dataHutang.sisa,
    //     hutangId: id,
    //   });
    await TransaksiModel.update(
      {
        lunas: lunas,
      },
      {
        where: {
          id: id,
        },
      }
    );
    console.log(dataLunas);
    return res.json({
      status: "Berhasil",
      messege: `Berhasil melunaskan hutang dari id ${id}`,
      data: dataHutang,
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
  tambahTransaksi,
  indexTransaksi,
  perbaruiTransaksi,
  hapusTransaksi,
  detailTransaksi,
  indexHutang,
  cicilHutang,
  lunaskan,
  hutangDetail,
};
