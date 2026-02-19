import { useState, useEffect } from 'react';
import { getData, saveData } from '../../utils/storage';
import { getCurrentUser, changePassword } from '../../utils/auth';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUsers = getData('users') || [];
    setUsers(storedUsers);
    setCurrentUser(getCurrentUser());
  }, []);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (changePassword(newPassword)) {
      setMessage('Contraseña actualizada correctamente');
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Actualizar lista de usuarios
      setUsers(getData('users'));
    } else {
      setError('Error al cambiar la contraseña');
    }
  };

  return (
    <div className="admin-users">
      <h2>Gestión de Usuarios</h2>
      
      <div className="password-change-form">
        <h3>Cambiar Contraseña</h3>
        
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Usuario Actual:</label>
            <input
              type="text"
              value={currentUser?.username || ''}
              disabled
            />
          </div>
          
          <div className="form-group">
            <label>Nueva Contraseña:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Cambiar Contraseña</button>
        </form>
      </div>
      
      <div className="users-list">
        <h3>Usuarios del Sistema</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="note">
          Nota: Por seguridad, solo se puede cambiar la contraseña del usuario actual.
          Para modificar otros usuarios, edite directamente los datos en localStorage.
        </p>
      </div>
    </div>
  );
};

export default AdminUsers;
