'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('order_details', { 
    id_order_details: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    id_order:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id_orders',
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
    },
    id_menu:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'menu',
          key: 'id_menu',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    amount:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unit_price:{
      type: Sequelize.FLOAT,
      allowNull: false
    },
    description:{
      type: Sequelize.STRING,
      allowNull: true
    },
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_details');
  }
};
