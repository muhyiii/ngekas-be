"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cicilan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cicilan.belongsTo(models.hutang, {
        as: "hutang",
        foreignKey: "id",
      });
    }
  }
  cicilan.init(
    {
      hutangId: DataTypes.INTEGER,
      bayar: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cicilan",
    }
  );
  return cicilan;
};
