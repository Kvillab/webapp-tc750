import { Link } from "react-router-dom";
import { MapPin, Users, User } from "lucide-react";
import { getImageUrl } from "../services/api";

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

const ProjectCard = ({ proyecto }) => {
  if (!proyecto) return null;

  const imagenUrl = getImageUrl(proyecto.imagenes?.[0]);
  const status =
    STATUS_CONFIG[proyecto.estado] || STATUS_CONFIG.en_planificacion;

  return (
    <Link
      to={`/proyectos/${proyecto.slug ?? proyecto.documentId}`}
      className="block overflow-hidden bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg"
    >
      {imagenUrl ? (
        <div className="relative">
          <img
            src={imagenUrl}
            alt={proyecto.titulo}
            className="object-cover w-full h-56"
          />
          <span
            className={`absolute top-3 right-3 py-1 px-3 text-xs font-semibold rounded-full ${status.bg} ${status.text}`}
          >
            {status.label}
          </span>
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-full h-40 bg-gray-100">
          <span className="text-4xl text-gray-300">📋</span>
          <span
            className={`absolute top-3 right-3 py-1 px-3 text-xs font-semibold rounded-full ${status.bg} ${status.text}`}
          >
            {status.label}
          </span>
        </div>
      )}

      <div className="py-5 px-6">
        <div className="flex justify-between items-center mb-3 text-sm">
          {proyecto.categoria?.nombre && (
            <span className="py-1 px-3 font-semibold text-gray-700 bg-gray-100 rounded-full">
              {proyecto.categoria.nombre}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-800">
          {proyecto.titulo}
        </h3>

        {proyecto.descripcion && (
          <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">
            {proyecto.descripcion}
          </p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {proyecto.ubicacion && (
            <div className="flex gap-1.5 items-center">
              <MapPin size={15} className="text-[#4fb9ab] shrink-0" />
              <span>{proyecto.ubicacion}</span>
            </div>
          )}
          {proyecto.coordinador && (
            <div className="flex gap-1.5 items-center">
              <User size={15} className="text-[#4fb9ab] shrink-0" />
              <span>{proyecto.coordinador}</span>
            </div>
          )}
          {proyecto.metricas?.slice(0, 2).map((m, i) => (
            <div key={i} className="flex gap-1.5 items-center">
              <Users size={15} className="text-[#4fb9ab] shrink-0" />
              <span>
                {m.cantidad} {m.etiqueta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
