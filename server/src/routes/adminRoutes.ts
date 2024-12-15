import { Router } from 'express';

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
const router = Router();

// Rutas para películas
router.get('/peliculas', getPeliculas);             // Obtener todas las películas
router.get('/peliculas/:id', getPeliculaById);      // Obtener una película por ID
router.post('/peliculas', addPelicula);             // Agregar una nueva película
router.put('/peliculas/:id', updatePelicula);       // Editar una película existente
router.delete('/peliculas/:id', deletePelicula);    // Eliminar una película

// Rutas para géneros
router.get('/generos', getGeneros);                 // Obtener todos los géneros
router.get('/generos/:id', getGeneroById);          // Obtener un género por ID
router.post('/generos', addGenero);                 // Agregar un nuevo género
router.put('/generos/:id', updateGenero);           // Editar un género existente
router.delete('/generos/:id', deleteGenero);        // Eliminar un género

// Rutas para directores
router.get('/directores', getDirectores);           // Obtener todos los directores
router.get('/directores/:id', getDirectorById);     // Obtener un director por ID
router.post('/directores', addDirector);            // Agregar un nuevo director
router.put('/directores/:id', updateDirector);      // Editar un director existente
router.delete('/directores/:id', deleteDirector);   // Eliminar un director

export default router;
