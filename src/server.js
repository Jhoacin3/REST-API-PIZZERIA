const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const rolRouter = require("./routes/rol.router.js")
const menuRouter = require("./routes/menuRouter.js")
const categoryRouter = require("./routes/categoryRouter.js")
const configStoreRouter = require("./routes/configStoreRouter.js")
app.use(express.json());

const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//registro de rutas
app.use('/apiPizza', rolRouter);
app.use('/apiPizza', menuRouter);
app.use('/apiPizza', categoryRouter);
app.use('/apiPizza', configStoreRouter);

//Servidor escuchando...
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});