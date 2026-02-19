import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../../utils/auth';
import AdminBlogs from './AdminBlogs';
import AdminResearch from './AdminResearch';
import AdminComments from './AdminComments';
import AdminUsers from './AdminUsers';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) return <div>Verificando autenticación...</div>;

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administración TCU</h1>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </header>
      
      <nav className="admin-nav">
        <button 
          className={activeTab === 'blogs' ? 'active' : ''}
          onClick={() => setActiveTab('blogs')}
        >
          Artículos
        </button>
        <button 
          className={activeTab === 'research' ? 'active' : ''}
          onClick={() => setActiveTab('research')}
        >
          Investigaciones
        </button>
        <button 
          className={activeTab === 'comments' ? 'active' : ''}
          onClick={() => setActiveTab('comments')}
        >
          Comentarios
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Usuarios
        </button>
      </nav>
      
      <div className="admin-content">
        {activeTab === 'blogs' && <AdminBlogs />}
        {activeTab === 'research' && <AdminResearch />}
        {activeTab === 'comments' && <AdminComments />}
        {activeTab === 'users' && <AdminUsers />}
      </div>
    </div>
  );
};

export default AdminPanel;
