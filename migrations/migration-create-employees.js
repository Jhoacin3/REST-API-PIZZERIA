'use strict'; // Activa el modo estricto de JavaScript

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
    //up(): aplicar cambios a la base de datos (crear tabla, agregar columna, etc.)
    // Aquí se creará la tabla 'employees' con las columnas especificadas
    /// Método que se ejecuta cuando haces: npx sequelize-cli db:migrate

    // 👉 queryInterface es el objeto que tiene métodos para interactuar con la base de datos (crear tabla, insertar columna, etc.)
// 👉 Sequelize te da acceso a los tipos de datos como STRING, INTEGER, ENUM, etc.
    await queryInterface.createTable('employees', {

      id_employees: {
        allowNull: false,              // No permite valores nulos
        autoIncrement: true,           // Se incrementa automáticamente (1, 2, 3…)
        primaryKey: true,              // Es clave primaria
        type: Sequelize.INTEGER        // Tipo de dato entero
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [8, 300] // Minimum length of 8 characters
        }
      }
    },);
    
  },

  async down (queryInterface, Sequelize) {
    //down(): deshacer esos cambios (eliminar tabla, quitar columna, etc.)
    // Aquí se eliminará la tabla 'employees' si se necesita revertir la migración
    //👉 Método down(): revierte lo hecho por up(), en este caso borra la tabla.
    await queryInterface.dropTable('employees');
  }
};
