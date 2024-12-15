// Importaciones de dependencias usando ESM
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Configuración de variables de entorno
dotenv.config();

// Rutas importadas
import routes from './routes/routes';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/auth.routes';

// Configurar el servidor Express
const app = express();

// Middlewares
app.use(express.json()); // Análisis de solicitudes JSON
app.use(cookieParser()); // Agregar middleware de cookies
app.use(
  cors({
   origin: process.env.FRONTEND_URL, // Permitir solicitudes desde el frontend (ajustar según sea necesario)
    credentials: true, // Permite el envío de cookies
  })
);        // Habilitar CORS
app.use(morgan('dev'));  // Logging de solicitudes HTTP

// Ruta principal
app.get('/', (req: Request, res: Response) => {
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
app.use(routes);            // Rutas generales
app.use('/admin', adminRoutes); // Rutas de administración
app.use('/users', authRoutes); // Rutas de autenticación

// Conexión a MongoDB
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('La variable MONGODB_URI no está definida en el archivo .env');
}

mongoose.connect(mongoUri)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error: unknown) => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Finaliza el proceso si no se puede conectar a la base de datos
  });

// Manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});

// Configuración de puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
