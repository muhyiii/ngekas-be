"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaksi.belongsToMany(models.buBarang, {
        through: models.detailTransaksi,
        as: "barang",
        foreignKey: "transaksiId",
      });
      transaksi.hasMany(models.hutang, {
        as: "hutang",
        foreignKey: "transaksiId",
      });
    }
  }
  transaksi.init(
    {
      pembeli: DataTypes.STRING,
      nominalJual: DataTypes.INTEGER,
      nominalAwal: DataTypes.INTEGER,
      transaksi: DataTypes.STRING,
      outletId: DataTypes.INTEGER,
      lunas: DataTypes.ENUM("LUNAS", "BELUM LUNAS"),
    },
    {
      sequelize,
      modelName: "transaksi",
    }
  );
  return transaksi;
};
