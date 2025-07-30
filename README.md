# SISTEMA COMPLETO PARA RESTAURANTE
## Node.js
![Node.js](https://img.shields.io/badge/Node.js-22.14.0-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4..21.2x-lightgrey?logo=express)  
![MySQL](https://img.shields.io/badge/MySQL-8.0.41-blue?logo=MySQL)  
![License](https://img.shields.io/badge/license-MIT-blue.svg)  

## Tecnologías Backend

- **Node.js**- Entorno de ejecución de JavaScript en el servidor.
- **Express** - Framework web para Node.js.
- **MySQL** - Base de datos relacional.
- **Jest & Supertest** - Para pruebas unitarias de la API.
- **Dotenv** - Gestión de variables de entorno.
### Tecnologías Frontend
-  **Angular 19**


## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- *[Node.js](https://nodejs.org/)*
- *[Postman](https://www.postman.com/)* 
- *[Angular](https://angular.dev/)* 

instalar dependencias:
```
npm install
```
## Configuración
Configura las variables de entorno creando un archivo .env en la raíz del proyecto:
```
DB_HOST=
```
```
DB_PORT=
```
```
DB_NAME=bd_mypizzeria
```
```
DB_USER=root
```
```
DB_PASSWORD=
```
```
 JWT_SECRET=
```
> [!IMPORTANT]
> El siguiente comando creará la base de datos (si no existe), las tablas con relaciones y seeders establecidos.
```
npm run init:db
```
Para ejecutar migraciones:
```
npx sequelize-cli db:migrate
```
Para ejecutar todos los seeders:
```
npx sequelize-cli db:seed:all
```
Para deshacer todas las migraciones:
```
npx sequelize-cli db:migrate:undo:all
```
Este proyecto utiliza una base de datos MySQL para gestionar una pizzería. La estructura incluye tablas para: 

- Empleados (employees)
- Inventario (inventories)
- Menú (menu)
- Categorías (category)
- Mesas (Tables)
- Órdenes (orders)
- Detalles de órdenes (order_details)

## Ejecución del servidor
Para iniciar el servidor en modo desarrollo:
```
npm run start
```
Para iniciar los test:
```
 npm run test
```
> [!NOTE]
>Las pruebas se han implementado con Jest y Supertest.
# Estructura JSON de algunas respuestas de endpoints de la API REST Pizzería

Respuesta al iniciar sesion (Login)
<p align="left">
  <img src="https://github.com/user-attachments/assets/f25da307-73a0-45d5-bbbc-74c9d36a4b51" alt="home_inicio1" width="800px">
</p>

Obtención de configuraciones establecidas (GET)
<p align="left">
  <img src="https://github.com/user-attachments/assets/c04b5ba2-ff60-4841-b0fd-d4fa7bfcacc0" alt="home_inicio1" width="800px">
</p>
Obtención de empleados (GET)
<p align="left">
  <img src="https://github.com/user-attachments/assets/e1a2b1ae-96b2-4542-b1d7-dba8ab6cc32b" alt="home_inicio1" width="800px">
</p>

Creación de empleado (POST)
<p align="left">
  <img src="https://github.com/user-attachments/assets/613c1edc-db4a-41a3-a8ac-01ccbf5960cc" alt="home_inicio1" width="800px">
</p>

Estructura de Error de servidor controlado al obtener un empleado
<p align="left">
  <img src="https://github.com/user-attachments/assets/f4c17b4e-bedd-422f-b7c8-9004f6f5c3ee" alt="home_inicio1" width="800px">
</p>

Pago de una orden (POST)
<p align="left">
  <img src="https://github.com/user-attachments/assets/04d36b06-857e-430f-99d7-31e0193bf059" alt="home_inicio1" width="800px">
</p>

Error de servidor controlado 
<p align="left">
  <img src="https://github.com/user-attachments/assets/71f9a2a9-482a-422e-b9be-8c69c08f4530" alt="home_inicio1" width="800px">
</p>


