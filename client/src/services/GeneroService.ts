
// Define interface for Genero type
interface Genero {
  id?: string;
  nombre_genero: string;
}

// Crear la URL base de la API
const API_URL = import.meta.env.VITE_API_URL + "/admin/generos"; // URL base para la API de géneros

// Función para obtener todos los géneros
export const getGeneros = async (): Promise<Genero[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los géneros");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener géneros:", error);
    throw error;
  }
};

// Función para agregar un nuevo género
export const addGenero = async (genero: Genero): Promise<Genero> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(genero),
    });
    if (!response.ok) {
      throw new Error("Error al agregar el género");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al agregar género:", error);
    throw error;
  }
};

// Función para actualizar un género
export const updateGenero = async (id: string, genero: Genero): Promise<Genero> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(genero),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el género");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar género:", error);
    throw error;
  }
};

// Función para eliminar un género
export const deleteGenero = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el género");
    }
  } catch (error) {
    console.error("Error al eliminar género:", error);
    throw error;
  }
};