import { Request, Response } from 'express';
import Director from '../../models/Director';

// Obtener todos los directores
const getDirectores = async (req: Request, res: Response): Promise<Response> => {
    try {
        const directores = await Director.find();
        return res.json(directores);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener los directores" });
    }
};

// Obtener un director por ID
const getDirectorById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) return res.status(404).json({ mensaje: "Director no encontrado" });
        return res.json(director);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener el director" });
    }
};

// Agregar un nuevo director
const addDirector = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newDirector = new Director(req.body);
        await newDirector.save();
        return res.status(201).json(newDirector);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al agregar el director" });
    }
};

// Editar un director existente
const updateDirector = async (req: Request, res: Response): Promise<Response> => {
    try {
        const updatedDirector = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDirector) return res.status(404).json({ mensaje: "Director no encontrado" });
        return res.json(updatedDirector);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al editar el director" });
    }
};

// Eliminar un director
const deleteDirector = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deletedDirector = await Director.findByIdAndDelete(req.params.id);
        if (!deletedDirector) return res.status(404).json({ mensaje: "Director no encontrado" });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al eliminar el director" });
    }
};

export { getDirectores, getDirectorById, addDirector, updateDirector, deleteDirector };
