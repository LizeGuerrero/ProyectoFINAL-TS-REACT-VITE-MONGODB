"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Se crea un const para definir el esquema, por si en el futuro hay que cambiarlo o agregarle algo
const peliculaSchema = new mongoose_1.default.Schema({
    titulo: {
        type: String,
        required: true,
    },
    duracion: {
        type: Number, // duración en minutos
        required: true,
    },
    sinopsis: {
        type: String,
        required: true,
    },
    director_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "directores",
        required: true,
    },
    generos: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "generos",
        }],
    fecha_lanzamiento: {
        type: Date,
        required: true,
    }
});
const Pelicula = mongoose_1.default.model('peliculas', peliculaSchema);
exports.default = Pelicula;
