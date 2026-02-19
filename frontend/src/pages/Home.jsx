import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPaginaPrincipal } from "../services/api";
import EventCard from "../components/EventCard";
import HeroCarousel from "../components/HeroCarousel";

const BASE_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

function buildUrl(media) {
  if (!media) return null;
  const url = typeof media === "string" ? media : media.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaginaPrincipal()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Cargando...
      </div>
    );
  if (!data) return null;

  const imagenes = (
    Array.isArray(data.heroImagen) ? data.heroImagen : [data.heroImagen]
  )
    .map(buildUrl)
    .filter(Boolean);

  const evento = data.evento_destacado;

  return (
    <div>
      {/* Hero */}
      <section className="px-4 pt-12 mx-auto max-w-4xl md:px-8">
        <h1 className="mb-3 text-3xl font-bold text-center text-gray-900 md:text-5xl">
          {data.heroTitulo}
        </h1>
        <p className="mb-8 text-sm text-center text-gray-500 md:text-lg">
          {data.heroSubtitulo}
        </p>
        <div className="relative">
          <HeroCarousel imagenes={imagenes} />
          <div className="flex absolute bottom-6 left-1/2 z-10 gap-3 -translate-x-1/2">
            <Link
              to="/sobre-el-tcu"
              className="py-2 px-5 text-sm font-semibold text-gray-900 whitespace-nowrap rounded-full transition-colors hover:bg-yellow-400 bg-[#fec134]"
            >
              Conoce más
            </Link>
            <Link
              to="/contacto"
              className="py-2 px-5 text-sm font-semibold text-white whitespace-nowrap rounded-full border border-white transition-colors bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Misión / Visión / Valores */}
      <section className="py-10 px-4 mt-10 md:px-8 bg-[#ed741b]">
        <div className="grid grid-cols-1 gap-6 mx-auto max-w-4xl md:grid-cols-3">
          {[
            { titulo: "Misión", texto: data.mision },
            { titulo: "Visión", texto: data.vision },
            { titulo: "Valores", texto: data.valores },
          ].map(({ titulo, texto }) => (
            <div key={titulo} className="text-center">
              <h2 className="mb-3 text-base font-bold text-white">{titulo}</h2>
              <div className="p-4 text-sm leading-relaxed text-gray-700 bg-white rounded-xl shadow-sm min-h-[80px]">
                {texto}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Actividades recientes */}
      {evento && (
        <section className="py-10 px-4 mx-auto max-w-4xl md:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Actividades recientes
            </h2>
            <Link
              to="/vida-en-accion"
              className="text-sm font-medium hover:underline text-[#ed741b]"
            >
              Ver todas las actividades
            </Link>
          </div>
          <EventCard evento={evento} />
        </section>
      )}

      {/* Próximos eventos */}
      <section className="py-10 px-4 mx-auto max-w-4xl md:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Próximos eventos</h2>
          <Link
            to="/calendario"
            className="text-sm font-medium hover:underline text-[#ed741b]"
          >
            Ver calendario completo
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          No hay eventos próximos por ahora.
        </p>
      </section>
    </div>
  );
};

export default Home;
