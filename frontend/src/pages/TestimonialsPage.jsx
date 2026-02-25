import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { getTestimonios } from "../services/api";
import TestimonialCard from "../components/TestimonialCard";

const TestimonialsPage = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonios()
      .then(setTestimonios)
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

  return (
    <div className="py-12 px-4 mx-auto max-w-5xl md:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Mi Experiencia en el TCU
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Testimonios de estudiantes que han participado en el TCU-750. Conocé
          sus experiencias, aprendizajes y reflexiones sobre el trabajo comunal
          universitario.
        </p>
      </div>

      {/* Grid de testimonios */}
      {testimonios.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonios.map((t) => (
            <TestimonialCard key={t.documentId || t.id} testimonio={t} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-gray-50 rounded-xl">
          <MessageCircle size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">Aún no hay testimonios disponibles</p>
          <p className="text-sm text-gray-400">
            Pronto compartiremos experiencias de nuestros estudiantes
          </p>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
