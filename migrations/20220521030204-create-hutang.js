"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("hutangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      penghutang: {
        type: Sequelize.STRING,
      },
      lunas: {
        type: Sequelize.ENUM("LUNAS", "BELUM LUNAS"),
      },
      nominal: {
        type: Sequelize.INTEGER,
      },
      sisa: {
        type: Sequelize.INTEGER,
      },
      tempo: {
        type: Sequelize.DATE,
      },
      transaksiId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "transaksis",
          key: "id",
          as: "transaksiId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("hutangs");
  },
};
