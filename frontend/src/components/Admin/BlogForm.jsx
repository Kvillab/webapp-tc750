import { useState, useEffect } from 'react';

const BlogForm = ({ blog, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: 'Análisis',
    date: new Date().toISOString().split('T')[0],
    author: '',
    authorAvatar: '',
    image: '',
    tags: '',
    content: [{ type: 'paragraph', text: '' }],
    published: true
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        ...blog,
        tags: blog.tags ? blog.tags.join(', ') : '',
        date: blog.date.split('T')[0] || new Date().toISOString().split('T')[0]
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (index, field, value) => {
    const newContent = [...formData.content];
    newContent[index] = { ...newContent[index], [field]: value };
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const addContentSection = (type) => {
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, { type, text: '' }]
    }));
  };

  const removeContentSection = (index) => {
    if (formData.content.length > 1) {
      const newContent = formData.content.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, content: newContent }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      // Asegurarse de que la fecha está en el formato correcto
      date: new Date(formData.date).toISOString()
    };
    onSubmit(dataToSubmit);
  };

  return (
    <div className="blog-form">
      <h2>{blog ? 'Editar Artículo' : 'Crear Nuevo Artículo'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Slug (URL):</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Resumen (excerpt):</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Categoría:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Análisis">Análisis</option>
            <option value="Metodología">Metodología</option>
            <option value="Reflexión">Reflexión</option>
            <option value="Noticia">Noticia</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Autor:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Avatar del Autor (URL):</label>
          <input
            type="text"
            name="authorAvatar"
            value={formData.authorAvatar}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Imagen Destacada (URL):</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Etiquetas (separadas por comas):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Contenido:</label>
          {formData.content.map((section, index) => (
            <div key={index} className="content-section">
              <div className="section-header">
                <select
                  value={section.type}
                  onChange={(e) => handleContentChange(index, 'type', e.target.value)}
                >
                  <option value="paragraph">Párrafo</option>
                  <option value="heading">Encabezado</option>
                  <option value="quote">Cita</option>
                  <option value="image">Imagen</option>
                </select>
                <button 
                  type="button" 
                  onClick={() => removeContentSection(index)}
                  className="btn-remove"
                >
                  Eliminar
                </button>
              </div>
              
              {section.type === 'image' ? (
                <>
                  <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={section.src || ''}
                    onChange={(e) => handleContentChange(index, 'src', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Texto alternativo"
                    value={section.alt || ''}
                    onChange={(e) => handleContentChange(index, 'alt', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Leyenda (opcional)"
                    value={section.caption || ''}
                    onChange={(e) => handleContentChange(index, 'caption', e.target.value)}
                  />
                </>
              ) : (
                <textarea
                  value={section.text}
                  onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                  placeholder={`Escribe tu ${section.type} aquí...`}
                  rows={section.type === 'paragraph' ? 4 : 2}
                />
              )}
            </div>
          ))}
          
          <div className="add-buttons">
            <button type="button" onClick={() => addContentSection('paragraph')}>
              + Párrafo
            </button>
            <button type="button" onClick={() => addContentSection('heading')}>
              + Encabezado
            </button>
            <button type="button" onClick={() => addContentSection('quote')}>
              + Cita
            </button>
            <button type="button" onClick={() => addContentSection('image')}>
              + Imagen
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            />
            Publicado
          </label>
        </div>
        
        <div className="form-actions">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
