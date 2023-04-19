"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detailTransaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // detailTransaksi.belongsTo(models.transaksi, {
      //   as: "transaksi",
      //   foreignKey: "id",
      // });
      // detailTransaksi.belongsTo(models.barang, {
      //   as: "barang",
      //   foreignKey: "id",
      // });
    }
  }
  detailTransaksi.init(
    {
      barangId: DataTypes.INTEGER,
      transaksiId: DataTypes.INTEGER,
      jumlah: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "detailTransaksi",
    }
  );
  return detailTransaksi;
};
