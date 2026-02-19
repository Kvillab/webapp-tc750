import { Link } from "react-router-dom";
import { MapPin, Users, Calendar } from "lucide-react";
import { getImageUrl } from "../services/api";

const EventCard = ({ evento }) => {
  if (!evento) return null;

  const imagenUrl = getImageUrl(evento.imagenes?.[0]);
  const fecha = evento.fecha
    ? new Date(evento.fecha).toLocaleDateString("es-CR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link
      to={`/vida-en-accion/${evento.slug ?? evento.documentId}`}
      className="block overflow-hidden bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg"
    >
      {imagenUrl && (
        <img
          src={imagenUrl}
          alt={evento.titulo}
          className="object-cover w-full h-56"
        />
      )}

      <div className="py-5 px-6">
        <div className="flex justify-between items-center mb-3 text-sm">
          {evento.categoria?.nombre && (
            <span className="py-1 px-3 font-semibold text-gray-700 bg-gray-100 rounded-full">
              {evento.categoria.nombre}
            </span>
          )}
          {fecha && (
            <div className="flex gap-1.5 items-center text-gray-400">
              <Calendar size={14} className="shrink-0" />
              <span>{fecha}</span>
            </div>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-[#ed741b]">
          {evento.titulo}
        </h3>

        {evento.descripcion && (
          <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">
            {evento.descripcion}
          </p>
        )}

        <div className="flex flex-wrap gap-5 text-sm text-gray-600">
          {evento.ubicacion && (
            <div className="flex gap-1.5 items-center">
              <MapPin size={15} className="text-[#4fb9ab] shrink-0" />
              <span>{evento.ubicacion}</span>
            </div>
          )}
          {evento.metricas?.map((m, i) => (
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

export default EventCard;
