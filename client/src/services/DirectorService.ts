// Define interface for Director type
interface Director {
  id?: string;
  nombre_director: string;
}

// Crear la URL base de la API
const API_URL = import.meta.env.VITE_API_URL + "/admin/directores"; // URL base para la API de directores

// Función para obtener todos los directores
export const getDirectores = async (): Promise<Director[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los directores");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener directores:", error);
    throw error;
  }
};

// Función para agregar un nuevo director
export const addDirector = async (director: Director): Promise<Director> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(director),
    });
    if (!response.ok) {
      throw new Error("Error al agregar el director");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al agregar director:", error);
    throw error;
  }
};

// Función para actualizar un director
export const updateDirector = async (id: string, director: Director): Promise<Director> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(director),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el director");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar director:", error);
    throw error;
  }
};

// Función para eliminar un director
export const deleteDirector = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el director");
    }
  } catch (error) {
    console.error("Error al eliminar director:", error);
    throw error;
  }
};