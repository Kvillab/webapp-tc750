import { useState, useEffect } from 'react';
import { getData, saveData } from '../../utils/storage';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'approved', 'pending'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedComments = getData('comments') || [];
    setComments(storedComments);
    setLoading(false);
  }, []);

  const toggleApproval = (commentId) => {
    const updatedComments = comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, approved: !comment.approved } 
        : comment
    );
    
    saveData('comments', updatedComments);
    setComments(updatedComments);
  };

  const deleteComment = (commentId) => {
    if (window.confirm('¿Estás seguro de eliminar este comentario?')) {
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      saveData('comments', updatedComments);
      setComments(updatedComments);
    }
  };

  const filteredComments = comments.filter(comment => {
    // Filtrar por estado de aprobación
    if (filter === 'approved' && !comment.approved) return false;
    if (filter === 'pending' && comment.approved) return false;
    
    // Filtrar por término de búsqueda
    if (searchTerm && 
        !comment.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !comment.user.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  if (loading) return <div>Cargando comentarios...</div>;

  return (
    <div className="admin-comments">
      <h2>Gestión de Comentarios</h2>
      
      <div className="filters">
        <div className="filter-group">
          <label>Filtro:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="approved">Aprobados</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Buscar:</label>
          <input
            type="text"
            placeholder="Buscar por contenido o usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="comments-list">
        {filteredComments.length === 0 ? (
          <p>No se encontraron comentarios</p>
        ) : (
          filteredComments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div>
                  <strong>{comment.user}</strong> ({comment.email})
                  <span> - {new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <div className="content-type">
                  {comment.contentType === 'blog' ? 'Artículo' : 'Investigación'} - ID: {comment.contentId}
                </div>
              </div>
              
              <div className="comment-content">
                {comment.content}
              </div>
              
              {comment.replies && comment.replies.length > 0 && (
                <div className="comment-replies">
                  <strong>Respuestas:</strong>
                  {comment.replies.map((reply, index) => (
                    <div key={index} className="reply-item">
                      <div className="reply-header">
                        <strong>{reply.user}</strong> ({reply.email})
                        <span> - {new Date(reply.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="reply-content">{reply.content}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="comment-actions">
                <button 
                  onClick={() => toggleApproval(comment.id)}
                  className={comment.approved ? 'approved' : 'pending'}
                >
                  {comment.approved ? 'Desaprobar' : 'Aprobar'}
                </button>
                <button 
                  onClick={() => deleteComment(comment.id)}
                  className="delete"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminComments;
