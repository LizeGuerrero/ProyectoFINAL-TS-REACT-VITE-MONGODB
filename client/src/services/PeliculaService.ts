import axios from 'axios';

// Define interfaces for type safety
interface Pelicula {
  id?: string;
  titulo: string;
  duracion: number;
  sinopsis: string;
  director_id: string;
  generos?: string[];
  fecha_lanzamiento: Date;
}

interface Director {
  id: string;
  nombre: string;
}

// Crear la URL base de la API
const API_URL = import.meta.env.VITE_API_URL + "/admin/peliculas";

// Función para obtener todas las películas
export const getPeliculas = async (): Promise<Pelicula[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener las películas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener películas:", error);
    throw error;
  }
};

// Función para obtener una película por ID
export const getPeliculaById = async (id: string): Promise<Pelicula> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la película");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la película:", error);
    throw error;
  }
};

// Función para agregar una nueva película
export const addPelicula = async (pelicula: Pelicula): Promise<Pelicula> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pelicula),
    });
    if (!response.ok) {
      throw new Error("Error al agregar la película");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al agregar la película:", error);
    throw error;
  }
};

// Función para actualizar una película existente
export const updatePelicula = async (id: string, pelicula: Pelicula): Promise<Pelicula> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pelicula),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la película");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la película:", error);
    throw error;
  }
};

// Función para eliminar una película
export const deletePelicula = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la película");
    }

    // Código 204 indica que la eliminación fue exitosa, pero no hay contenido
    if (response.status === 204) {
      return;
    }

    // Si hay contenido, entonces procesar el JSON
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la película:", error);
    throw error;
  }
};

// Función para obtener directores
export const getDirectores = async (): Promise<Director[]> => {
  try {
    const response = await axios.get('/admin/directores');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los directores:', error);
    throw error;
  }
};