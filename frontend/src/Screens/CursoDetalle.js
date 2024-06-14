import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./CursoDetalle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { CursoContext } from '../Components/CursoContext';
import { AuthContext } from '../Components/AuthContext';

const CursoDetalle = () => {
  const { curso } = useContext(CursoContext);
  const { id } = useParams();
  const { token, userId } = useContext(AuthContext);


  const handleInscribirseClick = async () => {
    // Línea para fines de prueba, para simular un estado sin sesión iniciada. Comentar o eliminar en producción.

const token = localStorage.getItem('token');
console.log('Token retrieved:', token); // Debugging line

if (!token) {
  alert("Debes iniciar sesión para inscribirte en el curso.");
  return;
}
    try {
      const response = await fetch('http://localhost:8000/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          course_id: parseInt(id, 10)
        })
      });

      if (!response.ok) {
        throw new Error('Error al inscribirse en el curso');
      }

      alert("¡Inscrito al curso!");
    } catch (error) {
      console.error('An error occurred:', error);
      alert("Ocurrió un error al inscribirse en el curso.");
    }
  };

  if (!curso || curso.ID !== parseInt(id, 10)) {
    return <p>Curso no encontrado</p>;
  }

  return (
    <div className={styles.cursoDetalle}>
      <div className={styles.cursoContent}>
        <h1>{curso.Name}</h1>
        <button className={styles.inscripcion} onClick={handleInscribirseClick}>
          Inscribirse
        </button>
      </div>
      <p>{curso.Description}</p>
      <p><FontAwesomeIcon icon={faClock} /> Duración: {curso.Length}</p>
      <p><FontAwesomeIcon icon={faCheck} /> Requisitos: {curso.Req}</p>
      <p><FontAwesomeIcon icon={faChalkboardTeacher} /> Instructor: {curso.TeacherName}</p>
    </div>
  );
}

export default CursoDetalle;
