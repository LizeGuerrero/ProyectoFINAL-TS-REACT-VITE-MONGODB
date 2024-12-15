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
exports.deleteDirector = exports.updateDirector = exports.addDirector = exports.getDirectorById = exports.getDirectores = void 0;
const Director_1 = __importDefault(require("../../models/Director"));
// Obtener todos los directores
const getDirectores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const directores = yield Director_1.default.find();
        return res.json(directores);
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener los directores" });
    }
});
exports.getDirectores = getDirectores;
// Obtener un director por ID
const getDirectorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const director = yield Director_1.default.findById(req.params.id);
        if (!director)
            return res.status(404).json({ mensaje: "Director no encontrado" });
        return res.json(director);
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener el director" });
    }
});
exports.getDirectorById = getDirectorById;
// Agregar un nuevo director
const addDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDirector = new Director_1.default(req.body);
        yield newDirector.save();
        return res.status(201).json(newDirector);
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al agregar el director" });
    }
});
exports.addDirector = addDirector;
// Editar un director existente
const updateDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDirector = yield Director_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDirector)
            return res.status(404).json({ mensaje: "Director no encontrado" });
        return res.json(updatedDirector);
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al editar el director" });
    }
});
exports.updateDirector = updateDirector;
// Eliminar un director
const deleteDirector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDirector = yield Director_1.default.findByIdAndDelete(req.params.id);
        if (!deletedDirector)
            return res.status(404).json({ mensaje: "Director no encontrado" });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ mensaje: "Error al eliminar el director" });
    }
});
exports.deleteDirector = deleteDirector;
