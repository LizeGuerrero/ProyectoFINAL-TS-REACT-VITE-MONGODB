import { Request, Response } from 'express';
import Pelicula from '../../models/Pelicula';
import Genero from '../../models/Genero';

// Obtener todas las películas
const getPeliculas = async (req: Request, res: Response): Promise<void> => {
  try {
    const peliculas = await Pelicula.find()
      .populate("director_id", "nombre_director")
      .populate("generos", "nombre_genero");

    const peliculasConFechaFormateada = peliculas.map((pelicula) => ({
      ...pelicula.toObject(),
      fecha_lanzamiento: pelicula.fecha_lanzamiento.toISOString().split("T")[0],
    }));

    // Changed return to direct send
    res.json(peliculasConFechaFormateada);
  } catch (error) {
    console.error("Error al obtener las películas:", error);
    
    // Check if headers have already been sent
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "Error al obtener las películas", 
        details: error instanceof Error ? error.message : String(error) 
      });
    }
  }
};

// Obtener una película por ID
const getPeliculaById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    return res.json(pelicula);
  } catch (error) {
    console.error("Error al obtener la película:", (error as Error).message);
    return res.status(500).json({ error: 'Error al obtener la película', details: (error as Error).message });
  }
};

// Agregar una nueva película
const addPelicula = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log("Datos recibidos:", req.body);
    const generos = await Genero.find({
      _id: { $in: req.body.generos }
    });

    console.log("Géneros encontrados:", generos);

    const peliculaData = {
      ...req.body,
      generos: generos.map(g => g._id),
      fecha_lanzamiento: new Date(req.body.fecha_lanzamiento),
    };

    const newPelicula = new Pelicula(peliculaData);
    await newPelicula.save();
    return res.status(201).json(newPelicula);
  } catch (error) {
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
};

// Editar una película existente
const updatePelicula = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedPelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPelicula) return res.status(404).json({ error: 'Película no encontrada' });
    return res.json(updatedPelicula);
  } catch (error) {
    return res.status(500).json({ error: 'Error al editar película' });
  }
};

// Eliminar una película
const deletePelicula = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedPelicula = await Pelicula.findByIdAndDelete(req.params.id);
    if (!deletedPelicula) return res.status(404).json({ error: 'Película no encontrada' });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar película' });
  }
};

export { getPeliculas, getPeliculaById, addPelicula, updatePelicula, deletePelicula };
