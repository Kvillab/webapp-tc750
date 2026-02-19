const ProjectCard = ({ project }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-active";
      case "upcoming":
        return "status-upcoming";
      case "completed":
        return "status-completed";
      case "planning":
        return "status-planning";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "En ejecución";
      case "upcoming":
        return "Próximo inicio";
      case "completed":
        return "Completado";
      case "planning":
        return "En planificación";
      default:
        return status;
    }
  };

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <span className={`project-status ${getStatusClass(project.status)}`}>
          {getStatusText(project.status)}
        </span>
      </div>

      <div className="project-content">
        <div className="project-header">
          <span className="project-category">{project.category}</span>
          <span className="project-year">{project.year}</span>
        </div>

        <h2 className="project-title">{project.title}</h2>
        <p className="project-description">{project.description}</p>

        <div className="project-info">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{project.location}</span>
          </div>
          <div className="info-item">
            <i className="fas fa-user"></i>
            <span>{project.coordinator}</span>
          </div>
          <div className="info-item">
            <i className="fas fa-calendar"></i>
            <span>{project.schedule}</span>
          </div>
        </div>

        <div className="project-details">
          <div className="objectives">
            <h3>Objetivos</h3>
            <ul>
              {project.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div className="impact-data">
            <h3>Impacto</h3>
            <div className="impact-grid">
              {Object.entries(project.impact).map(([key, value]) => (
                <div key={key} className="impact-item">
                  <span className="impact-value">{value}</span>
                  <span className="impact-label">{key}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="activities">
            <h3>Actividades principales</h3>
            <ul>
              {project.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
