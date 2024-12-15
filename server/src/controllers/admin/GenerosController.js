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
exports.deleteGenero = exports.updateGenero = exports.addGenero = exports.getGeneroById = exports.getGeneros = void 0;
const Genero_1 = __importDefault(require("../../models/Genero"));
// Obtener todos los géneros
const getGeneros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generos = yield Genero_1.default.find();
        return res.json(generos);
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener los géneros" });
    }
});
exports.getGeneros = getGeneros;
// Obtener un género por ID
const getGeneroById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genero = yield Genero_1.default.findById(req.params.id);
        if (!genero)
            return res.status(404).json({ mensaje: "Género no encontrado" });
        return res.json(genero);
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener el género" });
    }
});
exports.getGeneroById = getGeneroById;
// Agregar un nuevo género
const addGenero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_genero } = req.body;
        // Verifica si el género ya existe
        const generoExistente = yield Genero_1.default.findOne({ nombre_genero });
        if (generoExistente) {
            // Si el género ya existe, devuelve un mensaje de error
            return res.status(400).json({ mensaje: "El género ya existe" });
        }
        // Si no existe, crea un nuevo género
        const newGenero = new Genero_1.default(req.body);
        yield newGenero.save();
        return res.status(201).json(newGenero);
    }
    catch (error) { // Aquí estamos casteando el error a "any"
        console.error("Error al agregar el género:", error);
        return res.status(500).json({ mensaje: "Error al agregar el género", details: error.message });
    }
});
exports.addGenero = addGenero;
// Editar un género existente
const updateGenero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGenero = yield Genero_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGenero)
            return res.status(404).json({ mensaje: "Género no encontrado" });
        return res.json(updatedGenero);
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al editar el género" });
    }
});
exports.updateGenero = updateGenero;
// Eliminar un género
const deleteGenero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedGenero = yield Genero_1.default.findByIdAndDelete(req.params.id);
        if (!deletedGenero)
            return res.status(404).json({ mensaje: "Género no encontrado" });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al eliminar el género" });
    }
});
exports.deleteGenero = deleteGenero;
