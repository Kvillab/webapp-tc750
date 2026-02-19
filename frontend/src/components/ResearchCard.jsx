import { Link } from "react-router-dom";
import { BarChart3, Users } from "lucide-react";
import { getImageUrl } from "../services/api";

const ResearchCard = ({ research }) => {
  if (!research) return null;

  const imagenUrl = getImageUrl(research.portada);

  const fecha = research.fechaPublicacion
    ? new Date(research.fechaPublicacion).toLocaleDateString("es-CR", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div className="overflow-hidden bg-white rounded-xl shadow-md">
      {imagenUrl && (
        <img
          src={imagenUrl}
          alt={research.titulo}
          className="block object-cover w-full h-64"
        />
      )}
      <div className="py-5 px-6">
        <div className="flex justify-between items-center mb-3 text-sm">
          {research.categoria?.nombre && (
            <span className="py-1 px-3 font-semibold text-gray-700 bg-gray-100 rounded-full">
              {research.categoria.nombre}
            </span>
          )}
          {fecha && <span className="text-gray-400">{fecha}</span>}
        </div>

        <h3 className="mb-2 text-xl font-bold">
          <Link
            to={`/sapere-aude/${research.slug}`}
            className="text-gray-800 no-underline transition-colors hover:text-[#ed741b]"
          >
            {research.titulo}
          </Link>
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-gray-500">
          {research.descripcion}
        </p>

        <div className="flex flex-wrap gap-5 text-sm text-gray-600">
          {research.metodologia && (
            <div className="flex gap-1.5 items-center">
              <BarChart3 size={15} className="text-[#4fb9ab] shrink-0" />
              <span>{research.metodologia}</span>
            </div>
          )}

          {research.metricas?.map((metrica, i) => (
            <div key={i} className="flex gap-1.5 items-center">
              <Users size={15} className="text-[#4fb9ab] shrink-0" />
              <span>
                {metrica.cantidad} {metrica.etiqueta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
