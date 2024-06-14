import React, { useState } from 'react';
import styles from "./Login.module.css";
import { CiUser, CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous error

    try {
      const  response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      /*const response2 = await fetch(`http://localhost:8000/login/getidbyemail/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });*/

      if (!response.ok) {
        throw new Error('Constraseña o email incorrecto');
      }

      const data = await response.json();
      // Assuming the response contains a token
      localStorage.setItem('token', data.token);
      //const data2 = await response2.json();
      //localStorage.setItem('userId', data2.userId);
      alert('Sesión iniciada'); // Show alert message
      console.log('Login successful:', data);

      // Redirect to another page or update the UI as needed
      navigate('/cursos')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Email"
              required
              maxLength="25"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CiUser className={styles.icon} />
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Password"
              required
              maxLength="25"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CiLock className={styles.icon} />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.rememberMe}>
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div>

          <button type="submit">Login</button>

          <div className={styles.register}>
            <p>Don’t have an account? <a href="/signIn">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
