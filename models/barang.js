"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      barang.belongsTo(models.outlet, { as: "outlet", foreignKey: "id" });
      // barang.belongsToMany(models.transaksi, {
      //   through:models.detailTransaksi,
      //   as: "transaksi",
      //   foreignKey: "barangId",
      // });
    }
  }
  barang.init(
    {
      barang: DataTypes.STRING,
      hargaAwal: DataTypes.INTEGER,
      hargaJual: DataTypes.INTEGER,
      outletId: DataTypes.INTEGER,
      stokBarang: DataTypes.INTEGER,
      kodeBarang: DataTypes.STRING,
      foto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "barang",
    }
  );
  return barang;
};
