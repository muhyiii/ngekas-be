"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      outlet.belongsTo(models.user, {
        as: "user",
        foreignKey: "id",
      });
      outlet.hasOne(models.barang, {
        as: "barang",
        foreignKey: "outletId",
      });
      outlet.hasOne(models.transaksi, {
        as: "transaksi",
        foreignKey: "outletId",
      });
    }
  }
  outlet.init(
    {
      outlet: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "outlet",
    }
  );
  return outlet;
};
