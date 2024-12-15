"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Instancia del enrutador
const router = (0, express_1.Router)();
// Ejemplo de ruta principal
router.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a las rutas de la aplicación',
    });
});
// Exportar el enrutador para usarlo en otros módulos
exports.default = router;
