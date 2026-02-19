import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Quote, Lightbulb } from "lucide-react";
import RichTextBlocks from "./RichTextBlocks";
import GalleryCarousel from "./GalleryCarousel";

const DynamicZone = ({ contenido, prefix = "evento" }) => {
  if (!contenido || !Array.isArray(contenido)) return null;

  return contenido.map((block, i) => {
    switch (block.__component) {
      case `${prefix}.bloque-texto`:
        return (
          <div key={i} className="mb-8">
            {block.texto && (
              <BlocksRenderer content={block.texto} blocks={RichTextBlocks} />
            )}
          </div>
        );

      case `${prefix}.galeria`:
        return <GalleryCarousel key={i} imagenes={block.ImagenConPie || []} />;

      case `${prefix}.testimonio`:
        return (
          <blockquote
            key={i}
            className="p-6 my-10 rounded-xl border-l-4 bg-[#4fb9ab]/5 border-[#4fb9ab]"
          >
            <Quote size={24} className="mb-3 opacity-50 text-[#4fb9ab]" />
            <p className="mb-4 text-lg italic leading-relaxed text-gray-700">
              {block.Cita}
            </p>
            <footer className="text-sm text-gray-600">
              <span className="font-semibold">{block.nombre}</span>
              {block.rol && (
                <span className="text-gray-400"> — {block.rol}</span>
              )}
            </footer>
          </blockquote>
        );

      case `${prefix}.aprendizajes-clave`:
        return (
          <div
            key={i}
            className="p-6 my-10 rounded-xl border bg-[#fec134]/10 border-[#fec134]/30"
          >
            <div className="flex gap-2 items-center mb-4">
              <Lightbulb size={20} className="text-[#ed741b]" />
              <h3 className="text-lg font-bold text-gray-900">
                {block.Titulo || "Aprendizajes Clave"}
              </h3>
            </div>
            {block.aprendizajes && (
              <BlocksRenderer
                content={block.aprendizajes}
                blocks={RichTextBlocks}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  });
};

export default DynamicZone;
