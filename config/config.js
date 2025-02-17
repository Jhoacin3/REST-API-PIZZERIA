const mysql = require('mysql2/promise');

require('dotenv').config();
module.exports = {
    MYSQL_HOST: process.env.DB_HOST,
    MYSQL_USER: process.env.DB_USER,
    MYSQL_PASSWORD: process.env.DB_PASSWORD,
    MYSQL_DATABASE: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    SALT_ROUNDS :10 //NÚMERO PARA LAS ENCRIPTACIONES CON BCRYPT
  };

