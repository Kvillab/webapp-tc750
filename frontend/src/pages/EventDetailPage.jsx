import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";
import DynamicZone from "../components/DynamicZone";
import { getEvento, getImageUrl } from "../services/api";

export default function EventDetailPage() {
  const { slug } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvento() {
      try {
        setLoading(true);
        setError(null);
        const data = await getEvento(slug);
        setEvento(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvento();
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
            Error al cargar la actividad
          </h2>
          <p className="mb-4 text-red-600">{error}</p>
          <Link
            to="/vida-en-accion"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Vida en Acción
          </Link>
        </div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
        <div className="p-12 text-center bg-gray-100 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold">
            Actividad no encontrada
          </h2>
          <p className="mb-4 text-gray-600">
            La actividad que buscas no existe o fue eliminada.
          </p>
          <Link
            to="/vida-en-accion"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Vida en Acción
          </Link>
        </div>
      </div>
    );
  }

  const portadaUrl = getImageUrl(evento.imagenes?.[0]);

  return (
    <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
      {/* Navegación */}
      <nav className="mb-8">
        <Link
          to="/vida-en-accion"
          className="inline-flex gap-1.5 items-center font-medium transition-opacity hover:opacity-80 text-[#4fb9ab]"
        >
          <ArrowLeft size={16} />
          Volver a Vida en Acción
        </Link>
      </nav>

      <article className="overflow-hidden bg-white rounded-2xl shadow-lg">
        {/* Portada */}
        {portadaUrl && (
          <img
            src={portadaUrl}
            alt={evento.titulo}
            className="object-cover w-full h-72 md:h-96"
          />
        )}

        {/* Header */}
        <header className="px-6 pt-8 pb-6 md:px-8">
          <div className="flex flex-wrap gap-3 mb-4">
            {evento.categoria?.nombre && (
              <span className="inline-block py-1.5 px-4 text-sm font-medium rounded-full bg-[#4fb9ab]/10 text-[#4fb9ab]">
                {evento.categoria.nombre}
              </span>
            )}
          </div>

          <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {evento.titulo}
          </h1>

          {evento.descripcion && (
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              {evento.descripcion}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-5 pt-4 text-sm text-gray-600 border-t border-gray-100">
            {evento.fecha && (
              <div className="flex gap-1.5 items-center">
                <Calendar size={16} className="text-[#4fb9ab] shrink-0" />
                <span>{formatFecha(evento.fecha)}</span>
              </div>
            )}
            {evento.ubicacion && (
              <div className="flex gap-1.5 items-center">
                <MapPin size={16} className="text-[#4fb9ab] shrink-0" />
                <span>{evento.ubicacion}</span>
              </div>
            )}
            {evento.metricas?.map((m, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <Users size={16} className="text-[#4fb9ab] shrink-0" />
                <span>
                  {m.cantidad} {m.etiqueta}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Galería de imágenes adicionales */}
        {evento.imagenes?.length > 1 && (
          <div className="px-6 mb-6 md:px-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {evento.imagenes.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt={`${evento.titulo} - ${i + 2}`}
                  className="object-cover w-full h-40 rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Contenido Dynamic Zone */}
        <div className="py-8 px-6 md:px-8">
          <DynamicZone contenido={evento.contenido} prefix="evento" />
        </div>
      </article>

      {/* Footer */}
      <footer className="pt-6 mt-8 text-center border-t border-gray-200">
        <Link
          to="/vida-en-accion"
          className="inline-flex gap-2 items-center py-3 px-6 font-medium text-white rounded-lg transition-colors bg-[#ed741b] hover:bg-[#ed741b]/90"
        >
          <ArrowLeft size={16} />
          Ver más actividades
        </Link>
      </footer>
    </div>
  );
}
