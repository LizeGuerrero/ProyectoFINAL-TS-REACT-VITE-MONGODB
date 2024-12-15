import { Request, Response } from 'express';
import Genero from '../../models/Genero';

// Obtener todos los géneros
const getGeneros = async (req: Request, res: Response): Promise<Response> => {
    try {
        const generos = await Genero.find();
        return res.json(generos);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener los géneros" });
    }
};

// Obtener un género por ID
const getGeneroById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ mensaje: "Género no encontrado" });
        return res.json(genero);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener el género" });
    }
};

// Agregar un nuevo género
const addGenero = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre_genero } = req.body;

        // Verifica si el género ya existe
        const generoExistente = await Genero.findOne({ nombre_genero });
        if (generoExistente) {
            // Si el género ya existe, devuelve un mensaje de error
            return res.status(400).json({ mensaje: "El género ya existe" });
        }

        // Si no existe, crea un nuevo género
        const newGenero = new Genero(req.body);
        await newGenero.save();
        return res.status(201).json(newGenero);
    } catch (error: any) {  // Aquí estamos casteando el error a "any"
        console.error("Error al agregar el género:", error);
        return res.status(500).json({ mensaje: "Error al agregar el género", details: error.message });
    }
};


// Editar un género existente
const updateGenero = async (req: Request, res: Response): Promise<Response> => {
    try {
        const updatedGenero = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGenero) return res.status(404).json({ mensaje: "Género no encontrado" });
        return res.json(updatedGenero);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al editar el género" });
    }
};

// Eliminar un género
const deleteGenero = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deletedGenero = await Genero.findByIdAndDelete(req.params.id);
        if (!deletedGenero) return res.status(404).json({ mensaje: "Género no encontrado" });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al eliminar el género" });
    }
};

export { getGeneros, getGeneroById, addGenero, updateGenero, deleteGenero };
