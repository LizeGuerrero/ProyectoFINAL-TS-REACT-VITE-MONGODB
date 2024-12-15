// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GestorPeliculas from './pages/GestorPeliculas';
import Header from './components/header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Header />  {/* Importamos el componente Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Ruta protegida para GestorPeliculas (requiere autenticación y rol admin) */}
        <Route
          path="/gestorpeliculas"
          element={
            <ProtectedRoute requiredRole="admin">
              <GestorPeliculas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
