'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('store_info', { 
      id_store_info: {
        allowNull: false, // No permite valores nulos
        autoIncrement: true, // Se incrementa automáticamente (1, 2, 3…)
        primaryKey: true, // Es clave primaria
        type: Sequelize.INTEGER, // Tipo de dato entero    
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // No permite valores nulos
        photo_url: Sequelize.STRING, // URL de la foto del local
        number_of_tables: Sequelize.INTEGER, // Número de mesas en el local
        enable: Sequelize.BOOLEAN, // Indica si el local está habilitado
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('store_info');
  }
};
