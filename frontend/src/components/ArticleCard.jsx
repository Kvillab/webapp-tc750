import { Link } from "react-router-dom";
import { getImageUrl } from "../services/api";

export default function ArticleCard({ articulo }) {
  const {
    titulo,
    slug,
    descripcion,
    portada,
    categoria,
    fechaPublicacion,
    autor,
  } = articulo;

  const portadaUrl = getImageUrl(portada);
  const categoriaNombre = categoria?.nombre || categoria;
  const autorNombre = autor?.nombre || autor;
  const autorAvatar = autor?.avatar ? getImageUrl(autor.avatar) : null;

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    return new Date(fecha).toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="overflow-hidden bg-white rounded-xl shadow-sm transition-shadow hover:shadow-md">
      {/* Portada */}
      {portadaUrl && (
        <Link to={`/explora-y-aprende/${slug}`}>
          <img
            src={portadaUrl}
            alt={titulo}
            className="object-cover w-full h-48 bg-[#fec134]"
          />
        </Link>
      )}

      <div className="p-5">
        {/* Categoría + Fecha */}
        <div className="flex justify-between items-center mb-3">
          {categoriaNombre && (
            <span className="py-1 px-3 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
              {categoriaNombre}
            </span>
          )}
          {fechaPublicacion && (
            <time className="text-sm text-gray-400">
              {formatFecha(fechaPublicacion)}
            </time>
          )}
        </div>

        {/* Título */}
        <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900">
          <Link
            to={`/explora-y-aprende/${slug}`}
            className="transition-colors hover:text-[#4fb9ab]"
          >
            {titulo}
          </Link>
        </h2>

        {/* Descripción */}
        {descripcion && (
          <p className="mb-4 text-sm leading-relaxed text-gray-500">
            {descripcion}
          </p>
        )}

        {/* Autor */}
        {autorNombre && (
          <div className="flex gap-2 items-center pt-3 border-t border-gray-100">
            {autorAvatar && (
              <img
                src={autorAvatar}
                alt={autorNombre}
                className="object-cover w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-600">{autorNombre}</span>
          </div>
        )}
      </div>
    </article>
  );
}
