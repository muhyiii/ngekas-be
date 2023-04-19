"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hutang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hutang.belongsTo(models.transaksi, {
        as: "transaksi",
        foreignKey: "id",
      });
      hutang.hasMany(models.cicilan, {
        as: "cicilan",
        foreignKey: "hutangId",
      });
    }
  }
  hutang.init(
    {
      penghutang: DataTypes.STRING,
      lunas: DataTypes.ENUM("LUNAS", "BELUM LUNAS"),
      nominal: DataTypes.INTEGER,
      sisa: DataTypes.INTEGER,
      tempo: DataTypes.DATE,
      transaksiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "hutang",
    }
  );
  return hutang;
};
