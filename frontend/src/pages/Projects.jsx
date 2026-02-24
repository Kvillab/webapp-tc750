import { useState, useEffect } from "react";
import { getProyectos } from "../services/api";
import ProjectCard from "../components/ProjectCard";

const STATUS_OPTIONS = [
  { value: "todos", label: "Todos" },
  { value: "activo", label: "Activos" },
  { value: "por_comenzar", label: "Por comenzar" },
  { value: "en_planificacion", label: "En planificación" },
  { value: "completado", label: "Completados" },
];

const Projects = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [estadoActivo, setEstadoActivo] = useState("todos");

  useEffect(() => {
    getProyectos()
      .then(setProyectos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categorias = [
    "Todas",
    ...new Set(proyectos.map((p) => p.categoria?.nombre).filter(Boolean)),
  ];

  let proyectosFiltrados = proyectos;
  if (categoriaActiva !== "Todas") {
    proyectosFiltrados = proyectosFiltrados.filter(
      (p) => p.categoria?.nombre === categoriaActiva,
    );
  }
  if (estadoActivo !== "todos") {
    proyectosFiltrados = proyectosFiltrados.filter(
      (p) => p.estado === estadoActivo,
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Cargando...
      </div>
    );
  }

  return (
    <div className="py-12 px-4 mx-auto max-w-5xl md:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Proyectos del TCU
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Conocé nuestras iniciativas para la defensa de la educación pública.
          Cada proyecto se desarrolla en colaboración con comunidades y actores
          educativos.
        </p>
      </div>

      {/* Filtro de categorías */}
      {categorias.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`py-2 px-5 text-sm font-medium rounded-full transition-colors ${
                categoriaActiva === cat
                  ? "bg-[#ed741b] text-white"
                  : "bg-[#ed741b]/10 text-[#ed741b] hover:bg-[#ed741b]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Filtro de estado */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setEstadoActivo(opt.value)}
            className={`py-1.5 px-4 text-xs font-medium rounded-full transition-colors border ${
              estadoActivo === opt.value
                ? "bg-[#4fb9ab] text-white border-[#4fb9ab]"
                : "bg-white text-gray-600 border-gray-300 hover:border-[#4fb9ab] hover:text-[#4fb9ab]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Grid de proyectos */}
      {proyectosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyectosFiltrados.map((proyecto) => (
            <ProjectCard
              key={proyecto.documentId || proyecto.id}
              proyecto={proyecto}
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-gray-400">
          No hay proyectos disponibles.
        </p>
      )}
    </div>
  );
};

export default Projects;
