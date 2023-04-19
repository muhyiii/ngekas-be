"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detailTransaksis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      barangId: {
        type: Sequelize.INTEGER,
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        references: {
          model: "barangs",
          key: "id",
          as: "barangId",
        },
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
      jumlah: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("detailTransaksis");
  },
};
