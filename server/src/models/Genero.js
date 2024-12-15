"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generoSchema = new mongoose_1.default.Schema({
    nombre_genero: {
        type: String,
        required: true,
    }
});
const Genero = mongoose_1.default.model("generos", generoSchema);
exports.default = Genero;
