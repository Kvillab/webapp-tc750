import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ArrowLeft } from "lucide-react";
import RichTextBlocks from "../components/RichTextBlocks";
import { getArticulo, getImageUrl } from "../services/api";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticulo() {
      try {
        setLoading(true);
        setError(null);
        const data = await getArticulo(slug);
        setArticulo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArticulo();
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
            Error al cargar el artículo
          </h2>
          <p className="mb-4 text-red-600">{error}</p>
          <Link
            to="/explora-y-aprende"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Explora y Aprende
          </Link>
        </div>
      </div>
    );
  }

  if (!articulo) {
    return (
      <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
        <div className="p-12 text-center bg-gray-100 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold">Artículo no encontrado</h2>
          <p className="mb-4 text-gray-600">
            El artículo que buscas no existe o fue eliminado.
          </p>
          <Link
            to="/explora-y-aprende"
            className="inline-flex gap-1.5 items-center font-medium hover:underline text-[#4fb9ab]"
          >
            <ArrowLeft size={16} />
            Volver a Explora y Aprende
          </Link>
        </div>
      </div>
    );
  }

  const {
    titulo,
    contenido,
    portada,
    categoria,
    fechaPublicacion,
    autor,
    descripcion,
  } = articulo;

  const portadaUrl = getImageUrl(portada);
  const categoriaNombre = categoria?.nombre || categoria;
  const autorNombre = autor?.nombre || autor;
  const autorAvatar = autor?.avatar ? getImageUrl(autor.avatar) : null;

  return (
    <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
      {/* Navegación */}
      <nav className="mb-8">
        <Link
          to="/explora-y-aprende"
          className="inline-flex gap-1.5 items-center font-medium transition-opacity hover:opacity-80 text-[#4fb9ab]"
        >
          <ArrowLeft size={16} />
          Volver a Explora y Aprende
        </Link>
      </nav>

      <article className="overflow-hidden bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <header className="px-6 pt-10 pb-6 md:px-8">
          {categoriaNombre && (
            <span className="inline-block py-1.5 px-4 mb-4 text-sm font-medium rounded-full bg-[#4fb9ab]/10 text-[#4fb9ab]">
              {categoriaNombre}
            </span>
          )}
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {titulo}
          </h1>
          {descripcion && (
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              {descripcion}
            </p>
          )}
          {/* Meta */}
          <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-gray-100">
            {autorNombre && (
              <div className="flex gap-2 items-center">
                {autorAvatar && (
                  <img
                    src={autorAvatar}
                    alt={autorNombre}
                    className="object-cover w-9 h-9 rounded-full"
                  />
                )}
                <span className="font-medium text-gray-700">{autorNombre}</span>
              </div>
            )}
            {fechaPublicacion && (
              <time className="text-sm text-gray-500">
                {formatFecha(fechaPublicacion)}
              </time>
            )}
          </div>
        </header>

        {/* Portada */}
        {portadaUrl && (
          <figure className="px-6 md:px-8">
            <img
              src={portadaUrl}
              alt={titulo}
              className="object-cover w-full h-auto rounded-xl max-h-[450px]"
            />
          </figure>
        )}

        {/* Contenido */}
        <div className="py-8 px-6 text-base leading-relaxed text-gray-700 md:px-8">
          {contenido && (
            <BlocksRenderer content={contenido} blocks={RichTextBlocks} />
          )}
        </div>
      </article>

      {/* Footer */}
      <footer className="pt-6 mt-8 text-center border-t border-gray-200">
        <Link
          to="/explora-y-aprende"
          className="inline-flex gap-2 items-center py-3 px-6 font-medium text-white rounded-lg transition-colors bg-[#ed741b] hover:bg-[#ed741b]/90"
        >
          <ArrowLeft size={16} />
          Ver más artículos
        </Link>
      </footer>
    </div>
  );
}
