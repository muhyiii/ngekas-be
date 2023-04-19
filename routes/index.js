const express = require("express");
const {
  register,
  registerOutlet,
  login,
  detailUser,
  indexOutlet,
  hapusOutlet,
  detailOutlet,
  perbaruiOutlet,
  verify,
  perbaruiUser,
} = require("../controller/akunOutlet");
const {
  tambahBarang,
  indexBarang,
  detailBarang,
  hapusBarang,
  perbaruiBarang,
} = require("../controller/barang");
const {
  tambahTransaksi,
  indexTransaksi,
  indexHutang,
  cicilHutang,
  lunaskan,
  hutangDetail,
} = require("../controller/transaksiHutang");
const validationMiddleware = require("../middleware/akunMiddleware");
const { akunValidator } = require("../validator/akunValidator");
const router = express.Router();

///   ROUTING DIBAWAH    ////
router.get("/", (req, res) => {
  return res.json({
    status: "Ok || Berhasi;",
    message: "Anda Berhasil Mengakses Route Kami, ngeKas",
  });
});

/// DAFTAR AKUN NGEKAS  ///
router.post("/akun/daftar", akunValidator, validationMiddleware, register);
/// LOGIN NGEKAS    ///
router.post("/akun/login", login);
/// BUAT VERIFY PASSWORD   ///
router.post("/akun/verify", verify);
/// DAFTAR OUTLET NGEKAS  ///
router.post("/outlet/daftar", registerOutlet);
/// LOGIN AKUN NGEKAS  ///
router.post("/akun/masuk", login);
/// EDIT AKUN NGEKAS  ///
router.put("/akun/data/:id/update", perbaruiUser);

/// GET DATA USER NGEKAS SECARA DETAIL ///
router.get("/akun/:id", detailUser);
/// GET SEMUA DATA OUTLET PER ID  ////
router.get("/outlet/data", indexOutlet);
// /// GET DETAIL OUTLET ///
// router.get("/outlet/data/:id", detailOutlet);
/// HAPUS OUTLET PER ID ///
router.delete("/outlet/data/:id/delete", hapusOutlet);
/// PERBARUI OUTLET PER ID ///
router.put("/outlet/data/:id/update", perbaruiOutlet);

/// TAMBAH BARANG NGEKAS  ///
router.post("/barang/tambah", tambahBarang);
/// GET SEMUA DATA BARANG ///
router.get("/barang/data", indexBarang);
// /// GET DETAIL DATA BARANG ///
// router.get("/barang/data/:id", detailBarang);
/// HAPUS BARANG PER ID ///
router.delete("/barang/data/:id/delete", hapusBarang);
/// PERBARUI DATA BARANG PER ID   ///
router.put("/barang/data/:id/update", perbaruiBarang);

///  TAMBAH TRANSAKSI BESERTA HUTANG JIKA BELUM LUNAS DLAINNYA  ///
router.post("/transaksi/daftar", tambahTransaksi);
/// GET SEMUA TRANSAKSI BERSERTA DETAIL DLL ////
router.get("/transaksi/data", indexTransaksi);

/// GET DATA HUTANG   ///
router.get("/hutang/data", indexHutang);
/// GET DATA  DETAIL HUTANG   ///
router.get("/hutang/data/:id", hutangDetail);

/// TAMBAH CICILAN HUTANG  ///
router.post("/hutang/data/:id/cicil", cicilHutang);
/// MELUNASKAN SEMUA DATA HUTANG DAN TRANASKSI  ///
router.post("/hutang/data/:id/lunaskan", lunaskan);

module.exports = router;
