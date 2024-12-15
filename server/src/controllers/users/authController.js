"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.verifyAuth = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registro de usuario
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Verificar si el correo electrónico ya está registrado
        const existingEmail = yield user_model_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ mensaje: "El correo electrónico ya está registrado" });
        }
        // Verificar si el nombre de usuario ya está registrado
        const existingUsername = yield user_model_1.default.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ mensaje: "El nombre de usuario ya está ocupado" });
        }
        // Crear nuevo usuario
        const newUser = new user_model_1.default({ username, email, password });
        yield newUser.save();
        // Crear el token JWT
        const payload = {
            userId: newUser._id,
            username: newUser.username,
            role: newUser.role
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
        // Establecer la cookie con el token
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(Date.now() + 3600000), // 1 hora
        });
        return res.status(201).json({
            mensaje: "Usuario registrado exitosamente",
            user: { username: newUser.username, role: newUser.role }
        });
    }
    catch (error) {
        console.error("Error en el registro de usuario:", error.message);
        return res.status(500).json({ mensaje: "Error al registrar el usuario", error: error.message });
    }
});
exports.register = register;
// Inicio de sesión
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Buscar al usuario por email
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }
        // Comparar la contraseña ingresada con la almacenada
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }
        // Crear el token JWT
        const payload = {
            userId: user._id,
            username: user.username,
            role: user.role
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
        // Establecer la cookie con el token
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Asegúrate de que esté habilitado solo en producción
            sameSite: 'lax',
            maxAge: 3600000 // 1 hora
        });
        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            user: { username: user.username, role: user.role }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error en el inicio de sesión", error: error.message });
    }
});
exports.login = login;
const verifyAuth = (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.status(401).json({ authenticated: false });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY);
        // Retorna la información decodificada del token
        return res.status(200).json({ authenticated: true, user: decoded });
    }
    catch (err) {
        return res.status(401).json({ authenticated: false });
    }
};
exports.verifyAuth = verifyAuth;
const logout = (req, res, next) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        // Consider adding domain and path for more comprehensive cookie clearing
        domain: process.env.COOKIE_DOMAIN, // Optional: if you have a specific domain
        path: '/', // Ensures cookie is cleared across the entire site
    });
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
};
exports.logout = logout;
