import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users } from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getCasoImpacto, getImageUrl } from "../services/api";
import RichTextBlocks from "../components/RichTextBlocks";

export default function ImpactDetailPage() {
  const { slug } = useParams();
  const [caso, setCaso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCaso() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCasoImpacto(slug);
        setCaso(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCaso();
  }, [slug]);

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
            Error al cargar el caso
          </h2>
          <p className="mb-4 text-red-600">{error}</p>
          <Link
            to="/impacto-comunal"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Impacto Comunal
          </Link>
        </div>
      </div>
    );
  }

  if (!caso) {
    return (
      <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
        <div className="p-12 text-center bg-gray-100 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold">Caso no encontrado</h2>
          <p className="mb-4 text-gray-600">
            El caso de impacto que buscas no existe o fue eliminado.
          </p>
          <Link
            to="/impacto-comunal"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Impacto Comunal
          </Link>
        </div>
      </div>
    );
  }

  const imagenUrl = getImageUrl(caso.imagen);

  return (
    <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
      {/* Navegación */}
      <nav className="mb-8">
        <Link
          to="/impacto-comunal"
          className="inline-flex gap-1.5 items-center font-medium transition-opacity hover:opacity-80 text-[#4fb9ab]"
        >
          <ArrowLeft size={16} />
          Volver a Impacto Comunal
        </Link>
      </nav>

      <article className="overflow-hidden bg-white rounded-2xl shadow-lg">
        {/* Portada */}
        {imagenUrl && (
          <img
            src={imagenUrl}
            alt={caso.titulo}
            className="object-cover w-full h-72 md:h-96"
          />
        )}

        {/* Header */}
        <header className="px-6 pt-8 pb-6 md:px-8">
          {caso.comunidad && (
            <span className="inline-flex gap-1.5 items-center py-1.5 px-4 mb-4 text-sm font-medium rounded-full bg-[#4fb9ab]/10 text-[#4fb9ab]">
              <MapPin size={14} />
              {caso.comunidad}
            </span>
          )}

          <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {caso.titulo}
          </h1>

          {caso.descripcion && (
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              {caso.descripcion}
            </p>
          )}

          {/* Métricas */}
          {caso.metricas?.length > 0 && (
            <div className="grid grid-cols-2 gap-4 p-5 mt-4 rounded-xl border border-gray-100 sm:grid-cols-3 bg-gray-50">
              {caso.metricas.map((m, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-[#ed741b]">
                    {m.cantidad?.toLocaleString("es-CR")}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 capitalize">
                    {m.etiqueta}
                  </p>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Contenido */}
        {caso.contenido && (
          <div className="py-8 px-6 md:px-8 prose prose-gray max-w-none">
            <BlocksRenderer content={caso.contenido} blocks={RichTextBlocks} />
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="pt-6 mt-8 text-center border-t border-gray-200">
        <Link
          to="/impacto-comunal"
          className="inline-flex gap-2 items-center py-3 px-6 font-medium text-white rounded-lg transition-colors bg-[#ed741b] hover:bg-[#ed741b]/90"
        >
          <ArrowLeft size={16} />
          Ver más casos de impacto
        </Link>
      </footer>
    </div>
  );
}
