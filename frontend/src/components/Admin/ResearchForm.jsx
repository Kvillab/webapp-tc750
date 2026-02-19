import { useState, useEffect } from 'react';

const ResearchForm = ({ research, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: 'Acceso Educativo',
    date: new Date().toISOString().split('T')[0],
    methodology: '',
    participants: '',
    duration: '',
    executiveSummary: '',
    objectives: [''],
    methodologyDetails: '',
    keyFindings: [''],
    conclusions: '',
    recommendations: [''],
    downloadLink: '',
    published: true
  });

  useEffect(() => {
    if (research) {
      setFormData({
        ...research,
        date: research.date.split('T')[0] || new Date().toISOString().split('T')[0],
        objectives: research.objectives || [''],
        keyFindings: research.keyFindings || [''],
        recommendations: research.recommendations || ['']
      });
    }
  }, [research]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      date: new Date(formData.date).toISOString()
    };
    onSubmit(dataToSubmit);
  };

  return (
    <div className="research-form">
      <h2>{research ? 'Editar Investigación' : 'Crear Nueva Investigación'}</h2>
      
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
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
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
          <label>Metodología:</label>
          <input
            type="text"
            name="methodology"
            value={formData.methodology}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Participantes:</label>
          <input
            type="text"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Duración:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Resumen Ejecutivo:</label>
          <textarea
            name="executiveSummary"
            value={formData.executiveSummary}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Objetivos:</label>
          {formData.objectives.map((obj, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={obj}
                onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => removeArrayItem('objectives', index)}
                disabled={formData.objectives.length <= 1}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('objectives')}>
            + Añadir Objetivo
          </button>
        </div>
        
        <div className="form-group">
          <label>Detalles de Metodología:</label>
          <textarea
            name="methodologyDetails"
            value={formData.methodologyDetails}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Hallazgos Clave:</label>
          {formData.keyFindings.map((finding, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={finding}
                onChange={(e) => handleArrayChange('keyFindings', index, e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => removeArrayItem('keyFindings', index)}
                disabled={formData.keyFindings.length <= 1}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('keyFindings')}>
            + Añadir Hallazgo
          </button>
        </div>
        
        <div className="form-group">
          <label>Conclusiones:</label>
          <textarea
            name="conclusions"
            value={formData.conclusions}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Recomendaciones:</label>
          {formData.recommendations.map((rec, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={rec}
                onChange={(e) => handleArrayChange('recommendations', index, e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => removeArrayItem('recommendations', index)}
                disabled={formData.recommendations.length <= 1}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('recommendations')}>
            + Añadir Recomendación
          </button>
        </div>
        
        <div className="form-group">
          <label>Enlace de Descarga (opcional):</label>
          <input
            type="text"
            name="downloadLink"
            value={formData.downloadLink}
            onChange={handleChange}
          />
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

export default ResearchForm;
