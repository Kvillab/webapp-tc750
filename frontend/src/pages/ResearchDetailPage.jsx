import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import RichTextBlocks from "../components/RichTextBlocks";
import { ArrowLeft, BarChart3, Users } from "lucide-react";
import { getInvestigacion, getImageUrl } from "../services/api";

const ResearchDetailPage = () => {
  const { slug } = useParams();
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResearch = async () => {
      try {
        const data = await getInvestigacion(slug);
        setResearch(data);
      } catch (error) {
        console.error("Error cargando investigación:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResearch();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Cargando...
      </div>
    );
  }

  if (!research) {
    return (
      <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
        <div className="p-12 text-center bg-gray-100 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold">
            Investigación no encontrada
          </h2>
          <p className="mb-4 text-gray-600">
            La investigación que buscas no existe o ha sido eliminada.
          </p>
          <Link
            to="/sapere-aude"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Sapere Aude
          </Link>
        </div>
      </div>
    );
  }

  const fecha = research.fechaPublicacion
    ? new Date(research.fechaPublicacion).toLocaleDateString("es-CR", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  const imagenUrl = getImageUrl(research.portada);

  return (
    <div className="py-12 px-4 mx-auto max-w-4xl md:px-8">
      {/* Navegación */}
      <nav className="mb-8">
        <Link
          to="/sapere-aude"
          className="inline-flex gap-1.5 items-center font-medium transition-opacity hover:opacity-80 text-[#4fb9ab]"
        >
          <ArrowLeft size={16} />
          Volver a Sapere Aude
        </Link>
      </nav>

      <article>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-4">
            {research.categoria?.nombre && (
              <span className="py-1 px-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">
                {research.categoria.nombre}
              </span>
            )}
            {fecha && (
              <span className="py-1 px-3 text-sm text-gray-600 bg-gray-100 rounded-full">
                {fecha}
              </span>
            )}
          </div>
          <h1 className="mb-3 text-4xl font-bold">{research.titulo}</h1>
          {research.descripcion && (
            <p className="text-lg leading-relaxed text-gray-600">
              {research.descripcion}
            </p>
          )}
        </div>

        {/* Imagen principal */}
        {imagenUrl && (
          <div className="overflow-hidden mb-8 rounded-lg">
            <img
              src={imagenUrl}
              alt={research.titulo}
              className="object-cover w-full h-auto"
            />
          </div>
        )}

        {/* Stats/Métricas */}
        {(research.metodologia || research.metricas?.length > 0) && (
          <div className="grid grid-cols-1 gap-4 p-6 mb-10 bg-gray-50 rounded-lg md:grid-cols-2">
            {research.metodologia && (
              <div className="flex gap-3">
                <BarChart3 size={20} className="mt-1 text-[#4fb9ab] shrink-0" />
                <div>
                  <span className="block text-sm font-semibold text-gray-700">
                    Metodología
                  </span>
                  <span className="block text-lg font-bold text-gray-900">
                    {research.metodologia}
                  </span>
                </div>
              </div>
            )}

            {research.metricas?.map((metrica, i) => (
              <div key={i} className="flex gap-3">
                <Users size={20} className="mt-1 text-[#4fb9ab] shrink-0" />
                <div>
                  <span className="block text-sm font-semibold text-gray-700">
                    {metrica.etiqueta}
                  </span>
                  <span className="block text-lg font-bold text-gray-900">
                    {metrica.cantidad}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contenido principal (Rich Text) */}
        {research.contenido && (
          <div className="mb-10 max-w-none">
            <BlocksRenderer
              content={research.contenido}
              blocks={RichTextBlocks}
            />
          </div>
        )}

        {/* Fallback si no hay contenido */}
        {!research.contenido && (
          <div className="py-8 text-center text-gray-500">
            <p>No hay contenido disponible para esta investigación</p>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="pt-6 mt-8 text-center border-t border-gray-200">
        <Link
          to="/sapere-aude"
          className="inline-flex gap-2 items-center py-3 px-6 font-medium text-white rounded-lg transition-colors bg-[#ed741b] hover:bg-[#ed741b]/90"
        >
          <ArrowLeft size={16} />
          Ver más investigaciones
        </Link>
      </footer>
    </div>
  );
};

export default ResearchDetailPage;
