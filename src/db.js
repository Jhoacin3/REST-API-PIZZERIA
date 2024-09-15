const mysql2 = require('mysql2/promise');
const CONFIG = require('../config/config');
require('dotenv').config(); //Nota: Cargar variables de entorno desde .env

const connection = mysql2.createPool({
    host: CONFIG.MYSQL_HOST,
    user: CONFIG.MYSQL_USER,
    password: CONFIG.MYSQL_PASSWORD,
    database: CONFIG.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306, // Puerto para MySQL
});
module.exports = connection;
