import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Users,
  User,
  Calendar,
  Target,
  ClipboardList,
  Clock,
} from "lucide-react";
import DynamicZone from "../components/DynamicZone";
import { getProyecto, getImageUrl } from "../services/api";

const STATUS_CONFIG = {
  activo: { label: "Activo", bg: "bg-green-100", text: "text-green-700" },
  por_comenzar: {
    label: "Por comenzar",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  en_planificacion: {
    label: "En planificación",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  completado: {
    label: "Completado",
    bg: "bg-gray-100",
    text: "text-gray-600",
  },
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProyecto() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProyecto(slug);
        setProyecto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProyecto();
  }, [slug]);

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    return new Date(fecha).toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
        <div className="p-12 text-center bg-red-50 rounded-xl border border-red-200">
          <h2 className="mb-2 text-xl font-semibold text-red-700">
            Error al cargar el proyecto
          </h2>
          <p className="mb-4 text-red-600">{error}</p>
          <Link
            to="/proyectos"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Proyectos
          </Link>
        </div>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
        <div className="p-12 text-center bg-gray-100 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold">
            Proyecto no encontrado
          </h2>
          <p className="mb-4 text-gray-600">
            El proyecto que buscás no existe o fue eliminado.
          </p>
          <Link
            to="/proyectos"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Proyectos
          </Link>
        </div>
      </div>
    );
  }

  const portadaUrl = getImageUrl(proyecto.imagenes?.[0]);
  const status =
    STATUS_CONFIG[proyecto.estado] || STATUS_CONFIG.en_planificacion;

  return (
    <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
      {/* Navegación */}
      <nav className="mb-8">
        <Link
          to="/proyectos"
          className="inline-flex gap-1.5 items-center font-medium transition-opacity hover:opacity-80 text-[#4fb9ab]"
        >
          <ArrowLeft size={16} />
          Volver a Proyectos
        </Link>
      </nav>

      <article className="overflow-hidden bg-white rounded-2xl shadow-lg">
        {/* Portada */}
        {portadaUrl && (
          <img
            src={portadaUrl}
            alt={proyecto.titulo}
            className="object-cover w-full h-72 md:h-96"
          />
        )}

        {/* Header */}
        <header className="px-6 pt-8 pb-6 md:px-8">
          <div className="flex flex-wrap gap-3 mb-4">
            {proyecto.categoria?.nombre && (
              <span className="inline-block py-1.5 px-4 text-sm font-medium rounded-full bg-[#4fb9ab]/10 text-[#4fb9ab]">
                {proyecto.categoria.nombre}
              </span>
            )}
            <span
              className={`inline-block py-1.5 px-4 text-sm font-medium rounded-full ${status.bg} ${status.text}`}
            >
              {status.label}
            </span>
          </div>

          <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {proyecto.titulo}
          </h1>

          {proyecto.descripcion && (
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              {proyecto.descripcion}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-5 pt-4 text-sm text-gray-600 border-t border-gray-100">
            {proyecto.ubicacion && (
              <div className="flex gap-1.5 items-center">
                <MapPin size={16} className="text-[#4fb9ab] shrink-0" />
                <span>{proyecto.ubicacion}</span>
              </div>
            )}
            {proyecto.coordinador && (
              <div className="flex gap-1.5 items-center">
                <User size={16} className="text-[#4fb9ab] shrink-0" />
                <span>{proyecto.coordinador}</span>
              </div>
            )}
            {proyecto.horario && (
              <div className="flex gap-1.5 items-center">
                <Clock size={16} className="text-[#4fb9ab] shrink-0" />
                <span>{proyecto.horario}</span>
              </div>
            )}
            {(proyecto.fechaInicio || proyecto.fechaFin) && (
              <div className="flex gap-1.5 items-center">
                <Calendar size={16} className="text-[#4fb9ab] shrink-0" />
                <span>
                  {formatFecha(proyecto.fechaInicio)}
                  {proyecto.fechaFin &&
                    ` — ${formatFecha(proyecto.fechaFin)}`}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Métricas de impacto */}
        {proyecto.metricas?.length > 0 && (
          <div className="px-6 pb-6 md:px-8">
            <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg sm:grid-cols-3 md:grid-cols-4">
              {proyecto.metricas.map((m, i) => (
                <div key={i} className="text-center">
                  <span className="block text-2xl font-bold text-[#ed741b]">
                    {m.cantidad}
                  </span>
                  <span className="block text-sm text-gray-600">
                    {m.etiqueta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Objetivos */}
        {proyecto.objetivos?.length > 0 && (
          <div className="px-6 pb-6 md:px-8">
            <div className="flex gap-2 items-center mb-3">
              <Target size={18} className="text-[#4fb9ab]" />
              <h2 className="text-lg font-bold text-gray-900">Objetivos</h2>
            </div>
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              {proyecto.objetivos.map((obj, i) => (
                <li key={i}>{obj.descripcion}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Actividades */}
        {proyecto.actividades?.length > 0 && (
          <div className="px-6 pb-6 md:px-8">
            <div className="flex gap-2 items-center mb-3">
              <ClipboardList size={18} className="text-[#4fb9ab]" />
              <h2 className="text-lg font-bold text-gray-900">
                Actividades principales
              </h2>
            </div>
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              {proyecto.actividades.map((act, i) => (
                <li key={i}>{act.descripcion}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Galería de imágenes adicionales */}
        {proyecto.imagenes?.length > 1 && (
          <div className="px-6 mb-6 md:px-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {proyecto.imagenes.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt={`${proyecto.titulo} - ${i + 2}`}
                  className="object-cover w-full h-40 rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Contenido Dynamic Zone */}
        {proyecto.contenido?.length > 0 && (
          <div className="py-8 px-6 md:px-8">
            <DynamicZone contenido={proyecto.contenido} />
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="pt-6 mt-8 text-center border-t border-gray-200">
        <Link
          to="/proyectos"
          className="inline-flex gap-2 items-center py-3 px-6 font-medium text-white rounded-lg transition-colors bg-[#ed741b] hover:bg-[#ed741b]/90"
        >
          <ArrowLeft size={16} />
          Ver más proyectos
        </Link>
      </footer>
    </div>
  );
}
