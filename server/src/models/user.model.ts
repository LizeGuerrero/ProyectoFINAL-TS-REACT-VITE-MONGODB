import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definir la interfaz para el tipo de datos del usuario
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    isActive: boolean;
    comparePassword(password: string): Promise<boolean>;
}

// Definir el esquema del usuario
const userSchema: Schema<IUser> = new mongoose.Schema({
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
userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10); //bcrypt genera una "sal" (salt) aleatoria con un factor de trabajo de 10
        this.password = await bcrypt.hash(this.password, salt); // Encriptar la contraseña con el salt
    }
    next(); // Continuar con el proceso de guardado del documento
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Crear el modelo de usuario
const User = mongoose.model<IUser>("User", userSchema);

export default User;
