const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const rolRouter = require("./routes/rol.router.js")
const menuRouter = require("./routes/menuRouter.js")
const categoryRouter = require("./routes/categoryRouter.js")
const configStoreRouter = require("./routes/configStoreRouter.js")
const employeesRouter = require("./routes/employeesRouter.js")
const authRouter = require("./routes/auth/auth.js")
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()) //nos ayudará a modificar las cookies, ojo!

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs')

//registro de rutas
app.use('/apiPizza', rolRouter);
app.use('/apiPizza', menuRouter);
app.use('/apiPizza', categoryRouter);
app.use('/apiPizza', configStoreRouter);
app.use('/apiPizza', employeesRouter);
app.use('/apiPizza', authRouter);

//Servidor escuchando...
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});