import { useState, useEffect, useCallback } from "react";

const HeroCarousel = ({ imagenes = [] }) => {
  const [slide, setSlide] = useState(0);

  const next = useCallback(
    () => setSlide((s) => (s + 1) % imagenes.length),
    [imagenes.length],
  );
  const prev = useCallback(
    () => setSlide((s) => (s - 1 + imagenes.length) % imagenes.length),
    [imagenes.length],
  );

  // Auto-avance cada 3s
  useEffect(() => {
    if (imagenes.length <= 1) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [next, imagenes.length]);

  if (imagenes.length === 0) return null;

  return (
    <div className="overflow-hidden relative rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        {imagenes.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Slide ${i + 1}`}
            className="object-cover flex-shrink-0 w-full h-64 md:h-[400px]"
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-black/20" />

      {imagenes.length > 1 && (
        <>
          <button
            onClick={prev}
            className="flex absolute left-3 top-1/2 justify-center items-center w-8 h-8 text-lg text-white rounded-full transition-colors -translate-y-1/2 bg-black/40 hover:bg-black/60"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="flex absolute right-3 top-1/2 justify-center items-center w-8 h-8 text-lg text-white rounded-full transition-colors -translate-y-1/2 bg-black/40 hover:bg-black/60"
            aria-label="Siguiente"
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex absolute bottom-4 left-1/2 gap-2 -translate-x-1/2">
            {imagenes.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === slide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
