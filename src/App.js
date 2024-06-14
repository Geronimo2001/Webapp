import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Cursos from './Screens/Cursos';
import CursoDetalle from './Screens/CursoDetalle';
import MisCursos from './Screens/MisCursos';
import SignIn from './Screens/SignIn';
import NavBar from './Components/NavBar';
import { CursoProvider } from './Components/CursoContext';
import { AuthProvider } from './Components/AuthContext';

function App() {
  useEffect(() => {
    // Eliminar el token del localStorage cada vez que la página se carga o se refresca
    localStorage.removeItem('token');
  }, []); // Dependencia vacía asegura que esto se ejecute solo una vez cuando el componente se monta
  return (
    <Router>
      <AuthProvider>
        <CursoProvider>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/curso/:id" element={<CursoDetalle />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/miscursos" element={<MisCursos />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </div>
        </CursoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
