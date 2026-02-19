import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = login(username, password);
    if (user) {
      navigate('/admin');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Acceso al Panel de Administración</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">Iniciar Sesión</button>
        
        <div className="login-note">
          <p>Nota: Usuario por defecto: <strong>admin</strong> / Contraseña: <strong>tcu750admin</strong></p>
          <p>Cambia la contraseña después del primer inicio de sesión.</p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
