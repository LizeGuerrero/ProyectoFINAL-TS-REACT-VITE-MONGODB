"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importaciones de dependencias usando ESM
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Configuración de variables de entorno
dotenv_1.default.config();
// Rutas importadas
const routes_1 = __importDefault(require("./routes/routes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// Configurar el servidor Express
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json()); // Análisis de solicitudes JSON
app.use((0, cookie_parser_1.default)()); // Agregar middleware de cookies
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL, // Permitir solicitudes desde el frontend (ajustar según sea necesario)
    credentials: true, // Permite el envío de cookies
})); // Habilitar CORS
app.use((0, morgan_1.default)('dev')); // Logging de solicitudes HTTP
// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de BlogPelis',
        rutasDisponibles: [
            '/',
            '/admin',
            '/users',
            '/api/...',
        ],
    });
});
// Rutas de la aplicación
app.use(routes_1.default); // Rutas generales
app.use('/admin', adminRoutes_1.default); // Rutas de administración
app.use('/users', auth_routes_1.default); // Rutas de autenticación
// Conexión a MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('La variable MONGODB_URI no está definida en el archivo .env');
}
mongoose_1.default.connect(mongoUri)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Finaliza el proceso si no se puede conectar a la base de datos
});
// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});
// Configuración de puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
exports.default = app;
