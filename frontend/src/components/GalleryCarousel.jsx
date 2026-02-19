import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../services/api";

const GalleryCarousel = ({ imagenes }) => {
  const [current, setCurrent] = useState(0);

  if (!imagenes || imagenes.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? imagenes.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === imagenes.length - 1 ? 0 : c + 1));

  const item = imagenes[current];
  const imgUrl = getImageUrl(item.imagen);

  return (
    <div className="my-10">
      <div className="overflow-hidden relative bg-gray-100 rounded-xl">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={item.pie_de_foto || ""}
            className="object-cover w-full h-72 md:h-96"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-72 text-gray-400 md:h-96">
            Imagen no disponible
          </div>
        )}

        {imagenes.length > 1 && (
          <>
            <button
              onClick={prev}
              className="flex absolute left-3 top-1/2 justify-center items-center w-9 h-9 text-white rounded-full transition-colors -translate-y-1/2 bg-black/40 hover:bg-black/60"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="flex absolute right-3 top-1/2 justify-center items-center w-9 h-9 text-white rounded-full transition-colors -translate-y-1/2 bg-black/40 hover:bg-black/60"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {item.pie_de_foto && (
        <p className="mt-2 text-sm italic text-center text-gray-500">
          {item.pie_de_foto}
        </p>
      )}

      {imagenes.length > 1 && (
        <div className="flex gap-2 justify-center mt-3">
          {imagenes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === current
                  ? "bg-[#ed741b]"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Imagen ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryCarousel;
