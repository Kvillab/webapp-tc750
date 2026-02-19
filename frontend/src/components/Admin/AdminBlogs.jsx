import { useState, useEffect } from 'react';
import { getData, saveData } from '../../utils/storage';
import BlogForm from './BlogForm';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBlogs = getData('blogs') || [];
    setBlogs(storedBlogs);
    setLoading(false);
  }, []);

  const handleCreate = () => {
    setCurrentBlog(null);
    setShowForm(true);
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      const updatedBlogs = blogs.filter(blog => blog.id !== id);
      saveData('blogs', updatedBlogs);
      setBlogs(updatedBlogs);
    }
  };

  const handleFormSubmit = (blogData) => {
    let updatedBlogs;
    
    if (currentBlog) {
      // Editar blog existente
      updatedBlogs = blogs.map(blog => 
        blog.id === currentBlog.id ? { ...blog, ...blogData } : blog
      );
    } else {
      // Crear nuevo blog
      const newBlog = {
        ...blogData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      updatedBlogs = [...blogs, newBlog];
    }
    
    saveData('blogs', updatedBlogs);
    setBlogs(updatedBlogs);
    setShowForm(false);
  };

  if (loading) return <div>Cargando artículos...</div>;

  return (
    <div className="admin-blogs">
      <div className="admin-header">
        <h2>Gestión de Artículos</h2>
        <button onClick={handleCreate} className="btn-create">
          + Nuevo Artículo
        </button>
      </div>
      
      {showForm ? (
        <BlogForm 
          blog={currentBlog} 
          onSubmit={handleFormSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        <div className="blogs-list">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{new Date(blog.date).toLocaleDateString()}</td>
                  <td>{blog.published ? 'Publicado' : 'Borrador'}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(blog)}>Editar</button>
                    <button onClick={() => handleDelete(blog.id)} className="delete">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
