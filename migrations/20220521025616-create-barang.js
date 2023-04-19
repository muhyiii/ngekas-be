"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("barangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      barang: {
        type: Sequelize.STRING,
      },
      hargaAwal: {
        type: Sequelize.INTEGER,
      },
      hargaJual: {
        type: Sequelize.INTEGER,
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
      stokBarang: {
        type: Sequelize.INTEGER,
      },
      kodeBarang: {
        type: Sequelize.STRING,
      },
      foto: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("barangs");
  },
};
