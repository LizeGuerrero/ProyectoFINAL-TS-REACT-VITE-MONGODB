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
const express_1 = __importDefault(require("express"));
// Importar los controladores
const PeliculasController_1 = require("../controllers/admin/PeliculasController");
const GenerosController_1 = require("../controllers/admin/GenerosController");
const DirectoresController_1 = require("../controllers/admin/DirectoresController");
// Crear una instancia del router
const router = express_1.default.Router();
// Rutas para películas
router.get('/peliculas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const peliculas = yield (0, PeliculasController_1.getPeliculas)(req, res); // No envíes la respuesta aquí
        res.json(peliculas); // Enviar la respuesta aquí
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching peliculas' });
    }
})); // Obtener todas las películas
router.get('/peliculas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pelicula = yield (0, PeliculasController_1.getPeliculaById)(req, res);
        res.json(pelicula);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching pelicula by ID' });
    }
})); // Obtener una película por ID
router.post('/peliculas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPelicula = yield (0, PeliculasController_1.addPelicula)(req, res);
        res.status(201).json(newPelicula);
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding pelicula' });
    }
})); // Agregar una nueva película
router.put('/peliculas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPelicula = yield (0, PeliculasController_1.updatePelicula)(req, res);
        res.json(updatedPelicula);
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating pelicula' });
    }
})); // Editar una película existente
router.delete('/peliculas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, PeliculasController_1.deletePelicula)(req, res);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting pelicula' });
    }
})); // Eliminar una película
// Rutas para géneros
router.get('/generos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generos = yield (0, GenerosController_1.getGeneros)(req, res);
        res.json(generos);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching generos' });
    }
})); // Obtener todos los géneros
router.get('/generos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genero = yield (0, GenerosController_1.getGeneroById)(req, res);
        res.json(genero);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching genero by ID' });
    }
})); // Obtener un género por ID
router.post('/generos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGenero = yield (0, GenerosController_1.addGenero)(req, res);
        res.status(201).json(newGenero);
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding genero' });
    }
})); // Agregar un nuevo género
router.put('/generos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGenero = yield (0, GenerosController_1.updateGenero)(req, res);
        res.json(updatedGenero);
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating genero' });
    }
})); // Editar un género existente
router.delete('/generos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, GenerosController_1.deleteGenero)(req, res);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting genero' });
    }
})); // Eliminar un género
// Rutas para directores
router.get('/directores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const directores = yield (0, DirectoresController_1.getDirectores)(req, res);
        res.json(directores);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching directores' });
    }
})); // Obtener todos los directores
router.get('/directores/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const director = yield (0, DirectoresController_1.getDirectorById)(req, res);
        res.json(director);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching director by ID' });
    }
})); // Obtener un director por ID
router.post('/directores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDirector = yield (0, DirectoresController_1.addDirector)(req, res);
        res.status(201).json(newDirector);
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding director' });
    }
})); // Agregar un nuevo director
router.put('/directores/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDirector = yield (0, DirectoresController_1.updateDirector)(req, res);
        res.json(updatedDirector);
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating director' });
    }
})); // Editar un director existente
router.delete('/directores/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, DirectoresController_1.deleteDirector)(req, res);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting director' });
    }
})); // Eliminar un director
exports.default = router;
