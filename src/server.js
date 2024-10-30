const express = require('express');
require('dotenv').config();
const app = express();
const rolRouter = require("./routes/rol.router.js")
const menuRouter = require("./routes/menuRouter.js")
app.use(express.json());

const port = process.env.PORT || 3000;

//registro de rutas
app.use('/apiPizza', rolRouter);
app.use('/apiPizza', menuRouter);

//Servidor escuchando...
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});