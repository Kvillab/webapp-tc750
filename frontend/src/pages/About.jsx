import { useState, useEffect } from "react";
import { getSobreElTcu } from "../services/api";
import {
  BookOpen,
  Target,
  History,
  Handshake,
  UsersRound,
  BrainCircuit,
} from "lucide-react";

const AboutPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSobreElTcu()
      .then(setData)
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

  if (!data) return null;

  const mainCards = [
    {
      titulo: "¿Qué es el TCU?",
      texto: data.queEs,
      icon: BookOpen,
    },
    {
      titulo: "Objetivos",
      texto: data.objetivos,
      icon: Target,
    },
    {
      titulo: "Historia",
      texto: data.historia,
      icon: History,
    },
  ];

  const valueCards = [
    {
      titulo: "Compromiso",
      texto: data.compromiso,
      icon: Handshake,
    },
    {
      titulo: "Participación",
      texto: data.participacion,
      icon: UsersRound,
    },
    {
      titulo: "Reflexión Crítica",
      texto: data.reflexionCritica,
      icon: BrainCircuit,
    },
  ];

  return (
    <div className="py-12 px-4 mx-auto max-w-5xl md:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Sobre el TCU
        </h1>
        <p className="text-lg text-gray-600">
          TC-750: "Defensa de la educación pública desde la perspectiva de la
          educación popular"
        </p>
      </div>

      {/* Sección principal */}
      <section className="p-6 mb-12 rounded-2xl md:p-10 bg-[#ed741b]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {mainCards.map(({ titulo, texto, icon: Icon }) => (
            <div key={titulo} className="flex flex-col">
              <div className="flex gap-2 items-center mb-3">
                <Icon size={20} className="text-white shrink-0" />
                <h2 className="text-base font-bold text-white">{titulo}</h2>
              </div>
              <div className="flex-1 p-5 text-sm leading-relaxed text-gray-700 bg-white rounded-xl shadow-sm">
                {texto}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {valueCards.map(({ titulo, texto, icon: Icon }) => (
            <div key={titulo} className="text-center">
              <div className="flex justify-center items-center mx-auto mb-3 w-10 h-10 rounded-full bg-[#ed741b]/10">
                <Icon size={20} className="text-[#ed741b]" />
              </div>
              <h3 className="mb-2 text-base font-bold text-gray-900">
                {titulo}
              </h3>
              <p className="p-4 text-sm leading-relaxed text-gray-600 rounded-xl border border-gray-200">
                {texto}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
