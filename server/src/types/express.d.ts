// src/types/express.d.ts
import { IUser } from './path-to-your-user-interface'; // Asegúrate de importar la interfaz IUser correctamente

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Aquí agregamos la propiedad user a la interfaz Request
        }
    }
}
