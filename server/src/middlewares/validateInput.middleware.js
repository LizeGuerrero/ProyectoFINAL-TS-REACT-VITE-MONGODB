"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validateRegisterInput = (req, res, next) => {
    const { username, email, password } = req.body;
    // Validación de campos requeridos
    if (!username || !email || !password) {
        res.status(400).json({ mensaje: "Faltan campos requeridos" });
        return; // Aquí terminamos la ejecución del middleware si hay error
    }
    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ mensaje: "Formato de correo electrónico inválido" });
        return; // Aquí terminamos la ejecución del middleware si hay error
    }
    // Validación de la longitud mínima de la contraseña
    if (password.length < 6) {
        res.status(400).json({ mensaje: "La contraseña debe tener al menos 6 caracteres" });
        return; // Aquí terminamos la ejecución del middleware si hay error
    }
    // Validación de fortaleza de la contraseña (una letra mayúscula, un número y un carácter especial)
    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordStrengthRegex.test(password)) {
        res.status(400).json({
            mensaje: "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial"
        });
        return; // Aquí terminamos la ejecución del middleware si hay error
    }
    next(); // Si todo está bien, llamamos a next() para continuar con el siguiente middleware
};
exports.validateRegisterInput = validateRegisterInput;
