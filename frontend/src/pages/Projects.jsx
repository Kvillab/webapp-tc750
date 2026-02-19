import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projectsData";
import "../assets/styles/projects.css";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section className="projects-page">
      <div className="page-header">
        <h1>Proyectos del TCU</h1>
        <p>
          Conoce nuestras iniciativas para la defensa de la educación pública
        </p>
      </div>

      <div className="projects-intro">
        <p>
          Nuestros proyectos buscan fortalecer la educación pública a través de
          la investigación, formación y acción social. Cada iniciativa se
          desarrolla en colaboración con comunidades y actores educativos.
        </p>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={filter === category ? "active" : ""}
            onClick={() => setFilter(category)}
          >
            {category === "all" ? "Todos" : category}
          </button>
        ))}
      </div>

      <div className="podcast-access-block">
        <Link to="/podcast" className="podcast-link">
          <img
            src="/images/spotify-icon.png"
            alt="Spotify Podcast"
            className="spotify-icon"
          />
          <span>Escucha nuestro Podcast en Spotify</span>
        </Link>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No se encontraron proyectos en esta categoría</p>
        </div>
      )}
    </section>
  );
};

export default Projects;
