"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaksis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pembeli: {
        type: Sequelize.STRING,
      },
      nominalJual: {
        type: Sequelize.INTEGER,
      },
      nominalAwal: {
        type: Sequelize.INTEGER,
      },
      transaksi: {
        type: Sequelize.STRING,
      },
      outletId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "outlets",
          key: "id",
          as: "outletId",
        },
      },
      lunas: {
        type: Sequelize.ENUM("LUNAS", "BELUM LUNAS"),
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
    await queryInterface.dropTable("transaksis");
  },
};
