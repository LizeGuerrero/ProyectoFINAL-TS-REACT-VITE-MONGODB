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
exports.deletePelicula = exports.updatePelicula = exports.addPelicula = exports.getPeliculaById = exports.getPeliculas = void 0;
const Pelicula_1 = __importDefault(require("../../models/Pelicula"));
const Genero_1 = __importDefault(require("../../models/Genero"));
// Obtener todas las películas
const getPeliculas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const peliculas = yield Pelicula_1.default.find()
            .populate("director_id", "nombre_director")
            .populate("generos", "nombre_genero");
        const peliculasConFechaFormateada = peliculas.map((pelicula) => (Object.assign(Object.assign({}, pelicula.toObject()), { fecha_lanzamiento: pelicula.fecha_lanzamiento.toISOString().split("T")[0] })));
        // Changed return to direct send
        res.json(peliculasConFechaFormateada);
    }
    catch (error) {
        console.error("Error al obtener las películas:", error);
        // Check if headers have already been sent
        if (!res.headersSent) {
            res.status(500).json({
                error: "Error al obtener las películas",
                details: error instanceof Error ? error.message : String(error)
            });
        }
    }
});
exports.getPeliculas = getPeliculas;
// Obtener una película por ID
const getPeliculaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pelicula = yield Pelicula_1.default.findById(req.params.id);
        if (!pelicula)
            return res.status(404).json({ error: 'Película no encontrada' });
        return res.json(pelicula);
    }
    catch (error) {
        console.error("Error al obtener la película:", error.message);
        return res.status(500).json({ error: 'Error al obtener la película', details: error.message });
    }
});
exports.getPeliculaById = getPeliculaById;
// Agregar una nueva película
const addPelicula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Datos recibidos:", req.body);
        const generos = yield Genero_1.default.find({
            _id: { $in: req.body.generos }
        });
        console.log("Géneros encontrados:", generos);
        const peliculaData = Object.assign(Object.assign({}, req.body), { generos: generos.map(g => g._id), fecha_lanzamiento: new Date(req.body.fecha_lanzamiento) });
        const newPelicula = new Pelicula_1.default(peliculaData);
        yield newPelicula.save();
        return res.status(201).json(newPelicula);
    }
    catch (error) {
        console.error("Error al agregar la película:", error);
        // Ensure we only send a response if one hasn't been sent already
        if (!res.headersSent) {
            return res.status(500).json({
                error: "Error al agregar la película",
                details: error instanceof Error ? error.message : String(error)
            });
        }
        // If headers already sent, just log the error
        return res.end();
    }
});
exports.addPelicula = addPelicula;
// Editar una película existente
const updatePelicula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPelicula = yield Pelicula_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPelicula)
            return res.status(404).json({ error: 'Película no encontrada' });
        return res.json(updatedPelicula);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al editar película' });
    }
});
exports.updatePelicula = updatePelicula;
// Eliminar una película
const deletePelicula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPelicula = yield Pelicula_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPelicula)
            return res.status(404).json({ error: 'Película no encontrada' });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al eliminar película' });
    }
});
exports.deletePelicula = deletePelicula;
