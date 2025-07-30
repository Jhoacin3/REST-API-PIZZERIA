const { exec } = require("child_process");
const mysql = require("mysql2/promise");
require("dotenv").config();

(async () => {
  try {
    // 1. Crear la base de datos si no existe
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log("✅ Base de datos creada o ya existente.");

    await connection.end();

    // 2. Ejecutar migraciones en orden específico

    console.log("🔧 Ejecutando migraciones en orden...");

    const runMigration = (file) =>
      new Promise((resolve, reject) => {
        exec(`npx sequelize-cli db:migrate --to ${file}`, (err, stdout, stderr) => {
          if (err) return reject(stderr);
          console.log(stdout);
          resolve();
        });
      });

    // Lista en orden deseado
    const orderedMigrations = [
      "migration-create-employees.js",
      "migration-create-store_info.js",
    ];

    // Ejecutar una por una
    for (const mig of orderedMigrations) {
      await runMigration(mig);
    }

    // Luego correr el resto (no en orden), omitiendo las ya ejecutadas
    console.log("📦 Ejecutando el resto de migraciones...");

    exec("npx sequelize-cli db:migrate", (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout);

      // 3. Ejecutar seeders
      console.log("🌱 Ejecutando seeders...");

      exec("npx sequelize-cli db:seed:all", (err, stdout, stderr) => {
        if (err) throw err;
        console.log(stdout);
        console.log("🎉 ¡Base de datos lista!");
      });
    });
  } catch (err) {
    console.error("❌ Error al crear la base de datos:", err);
  }
})();
