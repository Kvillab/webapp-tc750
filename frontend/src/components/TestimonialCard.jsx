import { Quote } from "lucide-react";
import { getImageUrl } from "../services/api";

const TestimonialCard = ({ testimonio }) => {
  if (!testimonio) return null;

  const fotoUrl = getImageUrl(testimonio.foto);
  const iniciales = testimonio.nombre
    ? testimonio.nombre
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
      <Quote size={24} className="mb-4 opacity-40 text-[#4fb9ab]" />

      <p className="flex-1 mb-6 text-gray-600 italic leading-relaxed">
        &ldquo;{testimonio.cita}&rdquo;
      </p>

      <div className="flex gap-3 items-center pt-4 border-t border-gray-100">
        {fotoUrl ? (
          <img
            src={fotoUrl}
            alt={testimonio.nombre}
            className="object-cover w-12 h-12 rounded-full shrink-0"
          />
        ) : (
          <div className="flex justify-center items-center w-12 h-12 text-sm font-bold text-white rounded-full shrink-0 bg-[#4fb9ab]">
            {iniciales}
          </div>
        )}

        <div className="min-w-0">
          <p className="font-semibold text-gray-900 truncate">
            {testimonio.nombre}
          </p>
          {testimonio.rol && (
            <p className="text-sm text-gray-500 truncate">{testimonio.rol}</p>
          )}
        </div>

        {testimonio.anio && (
          <span className="py-1 px-2.5 ml-auto text-xs font-medium rounded-full shrink-0 bg-[#fec134]/20 text-[#ed741b]">
            {testimonio.anio}
          </span>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
