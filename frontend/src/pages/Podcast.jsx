import { useState, useEffect } from "react";
import { Headphones, Calendar, ExternalLink } from "lucide-react";
import { getEpisodios, getImageUrl } from "../services/api";

const Podcast = () => {
  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEpisodios()
      .then(setEpisodios)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div className="py-12 px-4 mx-auto max-w-5xl md:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Desde el Salón del 750
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Escuchá y participá en nuestro podcast sobre educación pública y temas
          sociales.
        </p>
      </div>

      {/* Lista de episodios */}
      {episodios.length > 0 ? (
        <div className="space-y-6">
          {episodios.map((ep) => {
            const imagenUrl = getImageUrl(ep.imagen);
            return (
              <div
                key={ep.documentId || ep.id}
                className="flex flex-col overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md md:flex-row"
              >
                {/* Imagen */}
                {imagenUrl ? (
                  <img
                    src={imagenUrl}
                    alt={ep.titulo}
                    className="object-cover w-full h-48 md:w-56 md:h-auto shrink-0"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-48 bg-gradient-to-br from-[#ed741b]/10 to-[#fec134]/10 md:w-56 md:h-auto shrink-0">
                    <Headphones size={48} className="text-[#ed741b]/40" />
                  </div>
                )}

                {/* Contenido */}
                <div className="flex flex-col flex-1 p-6">
                  {ep.fecha && (
                    <div className="flex gap-1.5 items-center mb-2 text-sm text-gray-400">
                      <Calendar size={14} className="shrink-0" />
                      <span>{formatFecha(ep.fecha)}</span>
                    </div>
                  )}

                  <h2 className="mb-2 text-xl font-bold text-gray-900">
                    {ep.titulo}
                  </h2>

                  {ep.descripcion && (
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      {ep.descripcion}
                    </p>
                  )}

                  {ep.detalles && (
                    <p className="mb-4 text-sm leading-relaxed text-gray-500">
                      {ep.detalles}
                    </p>
                  )}

                  {ep.spotifyUrl && (
                    <a
                      href={ep.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex gap-2 items-center self-start py-2.5 px-5 mt-auto text-sm font-medium text-white rounded-lg transition-colors bg-[#1DB954] hover:bg-[#1aa34a]"
                    >
                      <Headphones size={16} />
                      Escuchar en Spotify
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center bg-gray-50 rounded-xl">
          <Headphones size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">Aún no hay episodios disponibles</p>
          <p className="text-sm text-gray-400">
            Pronto publicaremos nuevos episodios del podcast
          </p>
        </div>
      )}
    </div>
  );
};

export default Podcast;
