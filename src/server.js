const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const { verifyToken } = require('./middlewares/auth.middleware');
const cors = require('cors');

// Importar rutas
const rolRouter = require("./routes/rol.router.js");
const menuRouter = require("./routes/menuRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");
const configStoreRouter = require("./routes/configStoreRouter.js");
const employeesRouter = require("./routes/employeesRouter.js");
const authRouter = require("./routes/auth/auth.js");
const orderPaymentRouter = require("./routes/orderPaymentRouter.js");

const app = express();
// const port = process.env.PORT || 3000;
const port = process.env.NODE_ENV === 'test' ? 3000 : process.env.PORT || 4000;


// Middleware general
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Motor de plantillas
app.set('view engine', 'ejs');

// **Middleware Global**: Protección de rutas privadas
app.use((req, res, next) => {
    const publicRoutes = [
        '/apiPizza/auth/login',
        '/apiPizza/auth/register',
        '/apiPizza/auth/logout',
        '/apiPizza/employees/getEmployees',
        '/apiPizza/menu/getMenu',
        '/apiPizza/categories/getCategory',
        '/apiPizza/orderPayment/getTableNumbers'
    ];

    // Si la ruta es pública, permitir acceso sin token
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    // Verificar token para todas las demás rutas
    verifyToken(req, res, next);
});

// Registro de rutas
app.use('/apiPizza/roles', rolRouter);
app.use('/apiPizza/menu', menuRouter);
app.use('/apiPizza/categories', categoryRouter);
app.use('/apiPizza/config-store', configStoreRouter);
app.use('/apiPizza/employees', employeesRouter);
app.use('/apiPizza/auth', authRouter);
app.use('/apiPizza/orderPayment', orderPaymentRouter);

// Servidor escuchando...
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = {server, app};
