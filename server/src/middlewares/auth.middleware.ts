import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUser {
    userId: string;
    username: string;
    role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): Response | void => {
    // Obtener el token de las cookies en lugar del encabezado "Authorization"
    const token = req.cookies.auth_token; // Usamos "auth_token" como nombre de la cookie

    if (!token) {
        return res.status(401).json({ mensaje: "No se proporcionó token de autenticación" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string) as IUser;
        req.user = decoded;  // Guarda los datos del usuario decodificados (ej. userId, username, role)

        // Verificación de rol
        if (req.user.role && req.user.role !== 'admin') {
            return res.status(403).json({ mensaje: "Acceso denegado, permisos insuficientes" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "Token no válido" });
    }
};

