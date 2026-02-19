import { useState, useEffect } from "react";
import { getEventos } from "../services/api";
import EventCard from "../components/EventCard";

const EventsPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  useEffect(() => {
    getEventos()
      .then(setEventos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categorias = [
    "Todas",
    ...new Set(eventos.map((e) => e.categoria?.nombre).filter(Boolean)),
  ];

  const eventosFiltrados =
    categoriaActiva === "Todas"
      ? eventos
      : eventos.filter((e) => e.categoria?.nombre === categoriaActiva);

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
          Vida en Acción
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Actividades, aprendizajes y testimonios de nuestro trabajo en
          comunidad. "Agere Aude" significa "Atrévete a actuar". En esta sección
          compartimos las experiencias y aprendizajes de nuestro trabajo con las
          comunidades en la defensa de la educación pública.
        </p>
      </div>

      {/* Filtro de categorías */}
      {categorias.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`py-2 px-5 text-sm font-medium rounded-full transition-colors ${
                categoriaActiva === cat
                  ? "bg-[#ed741b] text-white"
                  : "bg-[#ed741b]/10 text-[#ed741b] hover:bg-[#ed741b]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid de eventos */}
      {eventosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventosFiltrados.map((evento) => (
            <EventCard key={evento.documentId || evento.id} evento={evento} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-gray-400">
          No hay actividades disponibles.
        </p>
      )}
    </div>
  );
};

export default EventsPage;
