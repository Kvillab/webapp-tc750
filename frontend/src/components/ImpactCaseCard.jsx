import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import { getImageUrl } from "../services/api";

const ImpactCaseCard = ({ caso }) => {
  if (!caso) return null;

  const imagenUrl = getImageUrl(caso.imagen);

  return (
    <Link
      to={`/impacto-comunal/${caso.slug ?? caso.documentId}`}
      className="block overflow-hidden bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg"
    >
      {imagenUrl ? (
        <div className="relative">
          <img
            src={imagenUrl}
            alt={caso.titulo}
            className="object-cover w-full h-48"
          />
          {caso.comunidad && (
            <span className="absolute bottom-3 left-3 py-1 px-3 text-xs font-medium text-white rounded-full backdrop-blur-sm bg-black/50">
              <MapPin size={12} className="inline mr-1" />
              {caso.comunidad}
            </span>
          )}
        </div>
      ) : (
        caso.comunidad && (
          <div className="py-3 px-6 bg-gray-50 border-b border-gray-100">
            <span className="flex gap-1.5 items-center text-sm text-gray-500">
              <MapPin size={14} className="shrink-0" />
              {caso.comunidad}
            </span>
          </div>
        )
      )}

      <div className="py-5 px-6">
        <h3 className="mb-2 text-lg font-bold text-gray-800">{caso.titulo}</h3>

        {caso.descripcion && (
          <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">
            {caso.descripcion}
          </p>
        )}

        {caso.metricas?.length > 0 && (
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {caso.metricas.slice(0, 2).map((m, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <Users size={15} className="text-[#4fb9ab] shrink-0" />
                <span>
                  {m.cantidad} {m.etiqueta}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ImpactCaseCard;
