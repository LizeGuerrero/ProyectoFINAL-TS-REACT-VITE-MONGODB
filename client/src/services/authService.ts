import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
// URL base de la API de autenticación
const API_URL = import.meta.env.VITE_API_URL + "/users";

// **Tipos de los datos que se envían y se reciben**
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin'; // Por defecto 'user'
  isActive?: boolean; // Por defecto true
}

interface User {
  username: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
}

export interface AuthResponse {
  mensaje: string;
  token?: string;
  usuario?: {
    username: string;
    email: string;
    role: 'user' | 'admin';
    isActive: boolean;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

interface ErrorResponse {
  mensaje: string;
}

// **Registro de un nuevo usuario**
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/register`, userData, {
      withCredentials: true,
    });
    console.log("Registro exitoso:", response.data); // Depuración
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("Error en el registro:", err); // Depuración
    throw err.response?.data?.mensaje || "Ocurrió un error durante el registro";
  }
};

// **Inicio de sesión**
import { AxiosResponse } from 'axios';

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(`${API_URL}/login`, loginData, {
      withCredentials: true,
    });

    const token = response.data.token;
    const user = response.data.usuario;

    if (token && user) {
      // Guardar el token y el rol en las cookies
      Cookies.set('auth_token', token);
      Cookies.set('user_role', user.role);  // Asegúrate de que se guarde correctamente

      // Verifica que se guardó correctamente
      console.log("Token:", token);
      console.log("Role:", user.role);
    }

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("Error en el inicio de sesión:", err);
    throw err.response?.data?.mensaje || "Ocurrió un error durante el inicio de sesión";
  }
};




// **Verificación del estado de autenticación**
export const checkAuth = async (): Promise<{ authenticated: boolean; user?: User }> => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      withCredentials: true,
    });
    return response.data; // Supone que el backend responde con { authenticated: true, user: { ... } }
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
    return { authenticated: false };
  }
};


// **Cerrar sesión**
export const logout = async (): Promise<{ mensaje: string }> => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      withCredentials: true, // Envía cookies para eliminar la sesión en el servidor
    });
    console.log("Cierre de sesión exitoso:", response.data); // Depuración
    return response.data; // Supone que el backend responde con { mensaje: "Sesión cerrada correctamente" }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("Error al cerrar sesión:", err); // Depuración
    throw err.response?.data?.mensaje || "Ocurrió un error al cerrar sesión";
  }
};

// Configuración global de axios
axios.defaults.withCredentials = true;
