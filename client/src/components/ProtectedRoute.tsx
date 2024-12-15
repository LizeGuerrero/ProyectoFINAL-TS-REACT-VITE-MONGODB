// src/components/ProtectedRoute.tsx

import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../services/authService';


interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'user' | 'admin'; // Opcional: puede verificar roles
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const { authenticated, user } = await checkAuth();
        if (authenticated) {
          setIsAuthenticated(true);
          setUserRole(user?.role || null);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Si no está autenticado, redirige al home
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  // Si tiene un rol requerido y no lo tiene, redirige a Home
  if (requiredRole && userRole !== requiredRole) {
    navigate('/');
    return null;
  }

  return <>{children}</>; // Si todo está bien, renderiza el contenido de la ruta protegida
};

export default ProtectedRoute;
