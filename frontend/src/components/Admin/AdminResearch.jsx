import { useState, useEffect } from 'react';
import { getData, saveData } from '../../utils/storage';
import ResearchForm from './ResearchForm';

const AdminResearch = () => {
  const [researchList, setResearchList] = useState([]);
  const [currentResearch, setCurrentResearch] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResearch = getData('research') || [];
    setResearchList(storedResearch);
    setLoading(false);
  }, []);

  const handleCreate = () => {
    setCurrentResearch(null);
    setShowForm(true);
  };

  const handleEdit = (research) => {
    setCurrentResearch(research);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta investigación?')) {
      const updatedResearch = researchList.filter(res => res.id !== id);
      saveData('research', updatedResearch);
      setResearchList(updatedResearch);
    }
  };

  const handleFormSubmit = (researchData) => {
    let updatedResearch;
    
    if (currentResearch) {
      // Editar investigación existente
      updatedResearch = researchList.map(res => 
        res.id === currentResearch.id ? { ...res, ...researchData } : res
      );
    } else {
      // Crear nueva investigación
      const newResearch = {
        ...researchData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      updatedResearch = [...researchList, newResearch];
    }
    
    saveData('research', updatedResearch);
    setResearchList(updatedResearch);
    setShowForm(false);
  };

  if (loading) return <div>Cargando investigaciones...</div>;

  return (
    <div className="admin-research">
      <div className="admin-header">
        <h2>Gestión de Investigaciones</h2>
        <button onClick={handleCreate} className="btn-create">
          + Nueva Investigación
        </button>
      </div>
      
      {showForm ? (
        <ResearchForm 
          research={currentResearch} 
          onSubmit={handleFormSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        <div className="research-list">
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
              {researchList.map(research => (
                <tr key={research.id}>
                  <td>{research.title}</td>
                  <td>{research.category}</td>
                  <td>{new Date(research.date).toLocaleDateString()}</td>
                  <td>{research.published ? 'Publicado' : 'Borrador'}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(research)}>Editar</button>
                    <button onClick={() => handleDelete(research.id)} className="delete">
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

export default AdminResearch;
