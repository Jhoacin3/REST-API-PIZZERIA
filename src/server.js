const connection = require('./db.js');
const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

//Prueba de conexión a la base de datos.
app.get('/ping', async (req, res) =>{
   const [result] = await connection.query('SELECT 1 + 1 AS result')
   res.json(result);
});

//Servidor escuchando...
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});