const express = require('express');
require('dotenv').config();
const app = express();
const rolRouter = require("./routes/rol.router.js")
const menuRouter = require("./routes/menuRouter.js")
const categoryRouter = require("./routes/categoryRouter.js")
app.use(express.json());

const port = process.env.PORT || 3000;

//registro de rutas
app.use('/apiPizza', rolRouter);
app.use('/apiPizza', menuRouter);
app.use('/apiPizza', categoryRouter);

//Servidor escuchando...
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});