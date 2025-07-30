'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tables", {
      id_tables: {
        allowNull: false, // No permite valores nulos
        autoIncrement: true, // Se incrementa automáticamente (1, 2, 3…)
        primaryKey: true, // Es clave primaria
        type: Sequelize.INTEGER, // Tipo de dato entero
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "store_info", // Nombre de la tabla referenciada
          key: "id_store_info", // Clave primaria de la tabla referenciada
        },
        onUpdate: "CASCADE", // Actualiza en cascada si cambia el id en stores
        onDelete: "CASCADE", // Elimina en cascada si se elimina el registro en stores
      },
      table_number:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status:{
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tables");
  },
};

