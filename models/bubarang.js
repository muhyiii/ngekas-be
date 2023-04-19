"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class buBarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      buBarang.belongsToMany(models.transaksi, {
        through: models.detailTransaksi,
        as: "transaksi",
        foreignKey: "barangId",
      });
      // define association here
    }
  }
  buBarang.init(
    {
      barang: DataTypes.STRING,
      hargaAwal: DataTypes.INTEGER,
      hargaJual: DataTypes.INTEGER,
      outletId: DataTypes.INTEGER,
     
      kodeBarang: DataTypes.STRING,
      foto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "buBarang",
    }
  );
  return buBarang;
};
