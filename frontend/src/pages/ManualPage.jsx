import { useState, useEffect } from "react";
import { Download, BookOpen } from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getManualEstudiante, getImageUrl } from "../services/api";
import RichTextBlocks from "../components/RichTextBlocks";

const ManualPage = () => {
  const [manual, setManual] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManualEstudiante()
      .then(setManual)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Cargando...
      </div>
    );
  }

  if (!manual) {
    return (
      <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
        <div className="py-16 text-center bg-gray-50 rounded-xl">
          <BookOpen size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">
            El manual del estudiante aún no está disponible
          </p>
          <p className="text-sm text-gray-400">
            Pronto estará listo para su consulta y descarga
          </p>
        </div>
      </div>
    );
  }

  const archivoUrl = getImageUrl(manual.archivo);

  return (
    <div className="py-12 px-4 mx-auto max-w-3xl md:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
          {manual.titulo || "Manual del Estudiante"}
        </h1>
        {manual.descripcion && (
          <p className="mx-auto max-w-2xl text-gray-600">
            {manual.descripcion}
          </p>
        )}
      </div>

      {/* Botón de descarga */}
      {archivoUrl && (
        <div className="flex justify-center mb-10">
          <a
            href={archivoUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex gap-2 items-center py-3 px-8 text-lg font-medium text-white rounded-lg shadow-md transition-colors bg-[#ed741b] hover:bg-[#ed741b]/90"
          >
            <Download size={20} />
            Descargar Manual (PDF)
          </a>
        </div>
      )}

      {/* Contenido en pantalla */}
      {manual.contenido && (
        <article className="p-6 bg-white rounded-2xl shadow-lg md:p-8 prose prose-gray max-w-none">
          <BlocksRenderer content={manual.contenido} blocks={RichTextBlocks} />
        </article>
      )}
    </div>
  );
};

export default ManualPage;
