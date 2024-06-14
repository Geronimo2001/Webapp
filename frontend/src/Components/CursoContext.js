import React, { createContext, useState } from 'react';

export const CursoContext = createContext();

export const CursoProvider = ({ children }) => {
  const [curso, setCurso] = useState(null);
  const [cursos, setCursos] = useState([]); // Añadido para manejar la lista de cursos

  return (
    <CursoContext.Provider value={{ curso, setCurso, cursos, setCursos }}>
      {children}
    </CursoContext.Provider>
  );
};
