import { Router, Request, Response } from 'express';

// Instancia del enrutador
const router = Router();

// Ejemplo de ruta principal
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Bienvenido a las rutas de la aplicación',
  });
});

// Exportar el enrutador para usarlo en otros módulos
export default router;
