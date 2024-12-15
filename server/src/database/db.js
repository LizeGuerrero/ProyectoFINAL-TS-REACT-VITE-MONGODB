"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importar librerías necesarias para la conexión a PostgreSQL
const pg_1 = require("pg");
// Crear un pool de conexiones con las credenciales de PostgreSQL
const pool = new pg_1.Pool({
    user: 'postgres', // Usuario de la base de datos
    host: 'localhost', // Servidor de la base de datos
    database: 'crud_users', // Nombre de la base de datos
    password: '3214', // Contraseña del usuario
    port: 5432, // Puerto por defecto de PostgreSQL
});
// Exportar la conexión para ser utilizada en otros módulos
exports.default = pool;
