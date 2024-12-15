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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Definir el esquema del usuario
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Por ahora solo 2, pero podríamos agregar otros roles, pero la posibilidad será mínima en el futuro.
        default: 'user' // Asignar 'user' por defecto
    },
    isActive: {
        type: Boolean,
        default: true // Por defecto, las cuentas estarán activas
    }
}, { timestamps: true });
// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const salt = yield bcryptjs_1.default.genSalt(10); //bcrypt genera una "sal" (salt) aleatoria con un factor de trabajo de 10
            this.password = yield bcryptjs_1.default.hash(this.password, salt); // Encriptar la contraseña con el salt
        }
        next(); // Continuar con el proceso de guardado del documento
    });
});
// Método para comparar contraseñas
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
// Crear el modelo de usuario
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
