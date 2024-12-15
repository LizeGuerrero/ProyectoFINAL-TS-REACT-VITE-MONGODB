import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthGestor from './AuthGestor';
import './header.css';
import hamster from '../assets/logo-Hamster.png';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../services/authService'; // Importar el servicio de autenticación

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // Para almacenar el rol del usuario
  const isChecking = useRef(false);
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    // Limpiar el token y el rol de las cookies
    Cookies.remove('auth_token');
    Cookies.remove('user_role');
    // Actualizar el estado
    setIsAuthenticated(false);
    setUserRole(null);
    // Redirigir al usuario al home
    navigate('/');
  };

  // Función para verificar si el token está presente y obtener el rol del usuario
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isChecking.current) return; // Evitar ejecución si ya está revisando
      isChecking.current = true;

      // Verificar si hay un token de autenticación en las cookies
      const token = Cookies.get('auth_token');
      setIsAuthenticated(!!token);

      if (token) {
        try {
          const { authenticated, user } = await checkAuth();
          if (authenticated) {
            setUserRole(user?.role || null);
          } else {
            setUserRole(null);
          }
        } catch (error) {
          console.error('Error al verificar autenticación:', error);
          setIsAuthenticated(false);
          setUserRole(null);
        }
      }

      isChecking.current = false; // Terminar verificación
    };

    // Verificar autenticación inicial
    checkAuthentication();

    // Agregar un listener para cambios en las cookies
    const intervalId = setInterval(checkAuthentication, 1000); // Verificar cada segundo

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // Se ejecuta al montar el componente

  const toggleAuthModal = () => {
    setShowAuthModal((prev) => !prev);
  };

  return (
    <header className="main-header">
      <div className="container-header">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={hamster} alt="Hamster Piensa" className="hamster-icon" />
          <span className="site-name">Hamster Piensa</span>
        </Link>

        {/* Toggle para menú responsive va en una cajita*/}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰ {/* Carácter Unicode para un ícono tipo "hamburguesa" */}
        </label>

        {/* Menú de navegación */}
        <nav className="main-navbar">
          <ul className="nav-list">
            {/* Enlace "GestorPeliculas" solo si el usuario está autenticado y tiene rol de 'admin' */}
            {isAuthenticated && userRole === 'admin' && (
              <li>
                <Link to="/GestorPeliculas">Gestor de Películas</Link>
                <ul className="dropdown">
                  <li><Link to="/">Acción</Link></li>
                  <li><Link to="/">Comedia</Link></li>
                  <li><Link to="/">Drama</Link></li>
                </ul>
              </li>
            )}

            {/* Enlaces visibles para todos */}
            <li><Link to="/contact">Contáctanos</Link></li>
            <li><Link to="/about">Sobre Nosotros</Link></li>

            {/* Mostrar botón de login o logout dependiendo del estado de autenticación */}
            <li>
              {isAuthenticated ? (
                <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
              ) : (
                <button className="login-btn" onClick={toggleAuthModal}>👤</button>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Componente AuthGestor */}
      {showAuthModal && <AuthGestor onClose={toggleAuthModal} />}
    </header>
  );
};

export default Header;
