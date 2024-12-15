import { useState } from 'react'; 
import PropTypes from 'prop-types'; 
import { login, register } from '../services/authService'; 
import './AuthGestor.css';
import Cookies from 'js-cookie';

interface AuthGestorProps {
  onClose: () => void; // La función onClose no recibe argumentos y no devuelve nada
}

const AuthGestor: React.FC<AuthGestorProps> = ({ onClose }) => {
  const [formType, setFormType] = useState<'login' | 'register'>('login'); // 'login' o 'register'
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [username, setUsername] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null); // Puede ser un string o null
  const [loading, setLoading] = useState<boolean>(false); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let response;
      if (formType === 'login') {
        response = await login({ email, password });
      } else {
        const userData = { username, email, password };
        response = await register(userData);
      }

      alert(response.mensaje);
      if (response.token) {
        // Guardar el token en las cookies
        Cookies.set('auth_token', response.token, { expires: 1 }); // Expira en 1 día
        // Actualizar estado de autenticación (esto también puede hacerlo el Header)
        window.location.reload();  // Forzamos una recarga para verificar la autenticación al instante
      }
      onClose(); // Cerrar el modal tras éxito
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Ocurrió un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchForm = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
    setEmail('');
    setPassword('');
    setUsername('');
    setError(null);
  };

  return (
    <div className="auth-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="auth-title">{formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        {error && <p className="auth-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          {formType === 'register' && (
            <input
              className="auth-input"
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            className="auth-input"
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        <p className="auth-switch" onClick={handleSwitchForm}>
          {formType === 'login'
            ? '¿No tienes cuenta? Regístrate'
            : '¿Ya tienes cuenta? Inicia sesión'}
        </p>
      </div>
    </div>
  );
};

AuthGestor.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AuthGestor;
