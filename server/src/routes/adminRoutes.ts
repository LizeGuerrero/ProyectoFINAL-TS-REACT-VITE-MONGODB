import express, { Request, Response } from 'express';

// Importar los controladores
import {
  getPeliculas,
  getPeliculaById,
  addPelicula,
  updatePelicula,
  deletePelicula
} from '../controllers/admin/PeliculasController';

import {
  getGeneros,
  getGeneroById,
  addGenero,
  updateGenero,
  deleteGenero
} from '../controllers/admin/GenerosController';

import {
  getDirectores,
  getDirectorById,
  addDirector,
  updateDirector,
  deleteDirector
} from '../controllers/admin/DirectoresController';

// Crear una instancia del router
const router = express.Router();

// Rutas para películas
router.get('/peliculas', async (req: Request, res: Response) => {
  try {
    const peliculas = await getPeliculas(req, res);
    res.json(peliculas);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching peliculas' });
  }
});             // Obtener todas las películas

router.get('/peliculas/:id', async (req: Request, res: Response) => {
  try {
    const pelicula = await getPeliculaById(req, res);
    res.json(pelicula);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pelicula by ID' });
  }
});      // Obtener una película por ID

router.post('/peliculas', async (req: Request, res: Response) => {
  try {
    const newPelicula = await addPelicula(req, res);
    res.status(201).json(newPelicula);
  } catch (err) {
    res.status(500).json({ message: 'Error adding pelicula' });
  }
});             // Agregar una nueva película

router.put('/peliculas/:id', async (req: Request, res: Response) => {
  try {
    const updatedPelicula = await updatePelicula(req, res);
    res.json(updatedPelicula);
  } catch (err) {
    res.status(500).json({ message: 'Error updating pelicula' });
  }
});       // Editar una película existente

router.delete('/peliculas/:id', async (req: Request, res: Response) => {
  try {
    await deletePelicula(req, res);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting pelicula' });
  }
});    // Eliminar una película

// Rutas para géneros
router.get('/generos', async (req: Request, res: Response) => {
  try {
    const generos = await getGeneros(req, res);
    res.json(generos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching generos' });
  }
});                 // Obtener todos los géneros

router.get('/generos/:id', async (req: Request, res: Response) => {
  try {
    const genero = await getGeneroById(req, res);
    res.json(genero);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching genero by ID' });
  }
});          // Obtener un género por ID

router.post('/generos', async (req: Request, res: Response) => {
  try {
    const newGenero = await addGenero(req, res);
    res.status(201).json(newGenero);
  } catch (err) {
    res.status(500).json({ message: 'Error adding genero' });
  }
});                 // Agregar un nuevo género

router.put('/generos/:id', async (req: Request, res: Response) => {
  try {
    const updatedGenero = await updateGenero(req, res);
    res.json(updatedGenero);
  } catch (err) {
    res.status(500).json({ message: 'Error updating genero' });
  }
});           // Editar un género existente

router.delete('/generos/:id', async (req: Request, res: Response) => {
  try {
    await deleteGenero(req, res);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting genero' });
  }
});        // Eliminar un género

// Rutas para directores
router.get('/directores', async (req: Request, res: Response) => {
  try {
    const directores = await getDirectores(req, res);
    res.json(directores);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching directores' });
  }
});           // Obtener todos los directores

router.get('/directores/:id', async (req: Request, res: Response) => {
  try {
    const director = await getDirectorById(req, res);
    res.json(director);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching director by ID' });
  }
});     // Obtener un director por ID

router.post('/directores', async (req: Request, res: Response) => {
  try {
    const newDirector = await addDirector(req, res);
    res.status(201).json(newDirector);
  } catch (err) {
    res.status(500).json({ message: 'Error adding director' });
  }
});            // Agregar un nuevo director

router.put('/directores/:id', async (req: Request, res: Response) => {
  try {
    const updatedDirector = await updateDirector(req, res);
    res.json(updatedDirector);
  } catch (err) {
    res.status(500).json({ message: 'Error updating director' });
  }
});      // Editar un director existente

router.delete('/directores/:id', async (req: Request, res: Response) => {
  try {
    await deleteDirector(req, res);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting director' });
  }
});   // Eliminar un director

export default router;
