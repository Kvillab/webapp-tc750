import { useState, useEffect } from 'react';
import { getData, saveData } from '../utils/storage';

const CommentSection = ({ contentId, contentType }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [replyContent, setReplyContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allComments = getData('comments') || [];
    const contentComments = allComments.filter(
      c => c.contentId === contentId && c.contentType === contentType
    );
    setComments(contentComments);
    setLoading(false);
  }, [contentId, contentType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCommentObj = {
      id: Date.now(),
      contentId,
      contentType,
      user,
      email,
      content: newComment,
      approved: true, // en un sistema real, esto sería false hasta aprobación
      createdAt: new Date().toISOString(),
      replies: []
    };
    
    const allComments = getData('comments') || [];
    const updatedComments = [...allComments, newCommentObj];
    saveData('comments', updatedComments);
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
    setUser('');
    setEmail('');
  };

  const handleReply = (commentId, content) => {
    const reply = {
      id: Date.now(),
      user,
      email,
      content,
      createdAt: new Date().toISOString()
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    });
    
    // Actualizar todos los comentarios en localStorage
    const allComments = getData('comments') || [];
    const newAllComments = allComments.map(c => 
      c.id === commentId 
        ? {...c, replies: [...(c.replies || []), reply]} 
        : c
    );
    saveData('comments', newAllComments);
    
    setComments(updatedComments);
    setReplyContent({ ...replyContent, [commentId]: '' });
  };

  if (loading) return <div>Cargando comentarios...</div>;

  return (
    <div className="comment-section">
      <h3>Comentarios ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <label htmlFor="user">Nombre:</label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comentario:</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar comentario</button>
      </form>
      
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.user}</strong>
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
            
            {comment.replies && comment.replies.map((reply) => (
              <div key={reply.id} className="reply">
                <div className="comment-header">
                  <strong>{reply.user}</strong>
                  <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="comment-content">{reply.content}</div>
              </div>
            ))}
            
            <div className="reply-form">
              <textarea
                value={replyContent[comment.id] || ''}
                onChange={(e) => setReplyContent({
                  ...replyContent,
                  [comment.id]: e.target.value
                })}
                placeholder="Escribe una respuesta..."
              ></textarea>
              <button 
                onClick={() => handleReply(comment.id, replyContent[comment.id])}
                disabled={!replyContent[comment.id]}
              >
                Responder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
