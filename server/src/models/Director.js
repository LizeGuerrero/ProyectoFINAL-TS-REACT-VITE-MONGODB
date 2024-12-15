"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const directorSchema = new mongoose_1.default.Schema({
    nombre_director: {
        type: String,
        required: true,
    }
});
const Director = mongoose_1.default.model("directores", directorSchema);
exports.default = Director;
