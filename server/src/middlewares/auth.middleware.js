"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    // Obtener el token de las cookies en lugar del encabezado "Authorization"
    const token = req.cookies.auth_token; // Usamos "auth_token" como nombre de la cookie
    if (!token) {
        return res.status(401).json({ mensaje: "No se proporcionó token de autenticación" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decoded; // Guarda los datos del usuario decodificados (ej. userId, username, role)
        // Verificación de rol
        if (req.user.role && req.user.role !== 'admin') {
            return res.status(403).json({ mensaje: "Acceso denegado, permisos insuficientes" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ mensaje: "Token no válido" });
    }
};
exports.authenticate = authenticate;
