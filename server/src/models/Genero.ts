import mongoose from 'mongoose';

const generoSchema = new mongoose.Schema({
    nombre_genero: {
        type: String,
        required: true,
    }
});

const Genero = mongoose.model("generos", generoSchema);

export default Genero;