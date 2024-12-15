import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    getPeliculas, addPelicula, updatePelicula, deletePelicula,
} from "../services/PeliculaService";
import { getDirectores } from "../services/DirectorService"; // Importa el servicio de directores exactamente el get
import { getGeneros } from "../services/GeneroService";
import "./styles/GestorDePeliculas.css";
interface Pelicula {
    _id?: string; // or mongoose.Types.ObjectId, depending on your setup
    titulo: string;
    duracion: number;
    sinopsis: string;
    director_id: Director;
    generos: Genero[]; // Or more complex types if needed
    fecha_lanzamiento: Date;
}
interface Director {
    _id: string;
    nombre_director: string;
}
interface Genero {
    _id: string;
    nombre_genero: string;
}
interface Formulario {
    _id?: string;
    titulo: string;
    duracion: number;
    sinopsis: string;
    director_id: string;
    fecha_lanzamiento: Date;
    generos: string[]; // Array de IDs de géneros
}
function GestorPeliculas() {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]); // Estado tipado como array de Pelicula
    const [directores, setDirectores] = useState<Director[]>([]); // Estado tipado como array de Director
    const [generos, setGeneros] = useState<Genero[]>([]); // Estado tipado como array de Genero
    const [form, setForm] = useState<Formulario>({
        titulo: "",
        duracion: 0,
        sinopsis: "",
        director_id: "",
        fecha_lanzamiento: new Date(),
        generos: [],
    });
    const [editingId, setEditingId] = useState<string | null>(null); //Esto es como
    useEffect(() => {
        // Cargar las películas al montar el componente
        loadPeliculas();
        loadDirectores(); // Cargar los directores
        loadGeneros(); // Función para cargar los géneros
    }, []);
    const loadPeliculas = async () => {
        const data = await getPeliculas();
        setPeliculas(data as unknown as Pelicula[]); // Type assertion
    };
    const loadDirectores = async () => {
        const data = await getDirectores();
        setDirectores(data as Director[]);
    };
    const loadGeneros = async () => {
        const data = await getGeneros(); // Función para obtener los géneros del backend
        setGeneros(data as Genero[]);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificación de campos obligatorios
        if (!form.director_id || form.generos.length === 0) {
            Swal.fire("Error", "Por favor, selecciona un director y al menos un género.", "error");
            return;
        }

        try {
            const peliculaData = {
                ...form,
            };

            // Actualizar o agregar la película según corresponda
            if (editingId) {
                await updatePelicula(editingId, peliculaData);
                Swal.fire("Actualizado", "Película actualizada con éxito", "success");
                setEditingId(null); // Limpiar estado de edición
            } else {
                await addPelicula(peliculaData);
                Swal.fire("Agregado", "Película agregada con éxito", "success");
            }
        } catch (error) {
            console.error("Error al agregar la película:", error);
            Swal.fire("Error", "Hubo un error al agregar la película.", "error");
        }

        // Restablecer el formulario
        setForm({
            titulo: "",
            duracion: 0,
            sinopsis: "",
            director_id: "",
            generos: [],
            fecha_lanzamiento: new Date(),
        });

        loadPeliculas(); // Recargar la lista de películas
    };


    const handleEdit = (pelicula: Pelicula) => {
        if (!pelicula._id) {
          Swal.fire("Error", "ID de película no encontrado", "error");
          return;
        }
      
        setForm({
          ...pelicula,
          director_id: pelicula.director_id._id,
          generos: pelicula.generos.map((genero) => genero._id),
          fecha_lanzamiento: new Date(pelicula.fecha_lanzamiento), // Asegúrate de que sea un objeto Date
        });
        setEditingId(pelicula._id);
        Swal.fire("Modo de edición", `Editando: ${pelicula.titulo}`, "info");
      };
      
      const handleCancelEdit = () => {
        // Limpia el formulario y sale del modo edición
        setForm({
            titulo: "",
            duracion: 0,
            sinopsis: "",
            director_id: "",
            fecha_lanzamiento: new Date(),
            generos: [],
        });
        setEditingId(null);
        Swal.fire("Modo edición cancelado", "Has salido del modo edición", "info");
    };


    const handleGenerosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setForm((prevState) => {
            const updatedGeneros = checked
                ? [...prevState.generos, value] // Si el checkbox está marcado, agregamos el género
                : prevState.generos.filter((generoId) => generoId !== value); // Si no está marcado, lo eliminamos
            return { ...prevState, generos: updatedGeneros };
        });
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await deletePelicula(id);
            Swal.fire("Eliminado", "La película ha sido eliminada.", "success");
            loadPeliculas();
        }
    };

    return (
        <div className="container">
            <h1>Gestión de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="titulo"
                    placeholder="Título"
                    value={form.titulo}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="duracion"
                    placeholder="Duración (minutos)"
                    value={form.duracion}
                    onChange={handleChange}
                />
                <input
                    name="sinopsis"
                    placeholder="Sinopsis"
                    value={form.sinopsis}
                    onChange={handleChange}
                />

                {/* Dropdown para seleccionar el director */}
                <select
                    name="director_id"
                    value={form.director_id}
                    onChange={handleChange}
                >
                    <option value="">Selecciona un director</option>
                    {directores.map((director) => (
                        <option key={director._id} value={director._id}>
                            {director.nombre_director}
                        </option>
                    ))}
                </select>
                <div>
                    <label>Selecciona los géneros:</label>
                    <div className="checkbox-group">
                        {generos.map((genero) => (
                            <div key={genero._id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={genero._id}
                                    value={genero._id}
                                    checked={form.generos.includes(genero._id)}
                                    onChange={handleGenerosChange}
                                />
                                <label htmlFor={genero._id}>
                                    {genero.nombre_genero}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <input
    type="date"
    name="fecha_lanzamiento"
    placeholder="Fecha de Lanzamiento"
    value={
        form.fecha_lanzamiento 
            ? new Date(form.fecha_lanzamiento).toISOString().split('T')[0]
            : ''
    }
    onChange={handleChange}
/>

<button type="submit">
            {editingId ? "Actualizar" : "Agregar"}
        </button>
        {editingId && (
            <button type="button" onClick={handleCancelEdit}>
                Cancelar edición
            </button>
        )}
            </form>

            <div className="seccionPelicula">
                {peliculas.map((pelicula) => (
                    <article key={pelicula._id} className="peliculaCard">
                        <header className="pelicula-header">
                            <h2>{pelicula.titulo}</h2>
                            <p className="pelicula-fecha">
                                {new Date(
                                    pelicula.fecha_lanzamiento
                                ).toLocaleDateString("es-ES", {
                                    timeZone: "UTC",
                                })}
                            </p>
                        </header>

                        <section className="pelicula-sinopsis">
                            <p>{pelicula.sinopsis}</p>
                        </section>

                        <section className="pelicula-director">
                            <p>
                                <strong>Director: </strong>
                                {pelicula.director_id.nombre_director}
                            </p>
                        </section>

                        <section className="pelicula-generos">
                            <p>
                                <strong>Géneros: </strong>
                                {pelicula.generos
                                    .map((genero) => genero.nombre_genero)
                                    .join(", ")}
                            </p>
                        </section>

                        <footer className="pelicula-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(pelicula)}
                            >
                                Editar
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => {
                                    if (pelicula._id) {
                                        handleDelete(pelicula._id);
                                    } else {
                                        Swal.fire("Error", "ID de la película no válido", "error");
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </footer>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default GestorPeliculas;
