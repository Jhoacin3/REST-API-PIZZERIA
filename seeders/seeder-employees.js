'use strict';
// Los seeders insertan datos en las tablas. Son útiles para:

// Agregar registros iniciales.

// Poner datos de prueba en desarrollo.

// Preconfigurar catálogos (roles, estados, categorías, etc).

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //👉 Usamos bulkInsert() para insertar muchos registros a la vez en la tabla Employees.
    await queryInterface.bulkInsert('employees', [{
      fullName: 'Administrador',
      email: 'admin@system.com',
      password: 'admin2002'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {} // Elimina TODOS los empleados
    );
  }
};
