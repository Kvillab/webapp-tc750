import { useState, useEffect } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { getImpactoComunal, getCasosImpacto } from "../services/api";
import ImpactCaseCard from "../components/ImpactCaseCard";

const ImpactPage = () => {
  const [pagina, setPagina] = useState(null);
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getImpactoComunal(), getCasosImpacto()])
      .then(([pag, cas]) => {
        setPagina(pag);
        setCasos(cas);
      })
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
          {pagina?.titulo || "Impacto Comunal"}
        </h1>
        {pagina?.descripcion && (
          <p className="mx-auto max-w-2xl text-gray-600">
            {pagina.descripcion}
          </p>
        )}
      </div>

      {/* Dashboard de métricas globales */}
      {pagina?.metricas?.length > 0 && (
        <div className="p-6 mb-12 rounded-xl border border-gray-100 shadow-sm bg-gradient-to-br from-gray-50 to-white">
          <div className="flex gap-2 items-center mb-6">
            <TrendingUp size={20} className="text-[#ed741b]" />
            <h2 className="text-lg font-bold text-gray-900">
              Nuestro Impacto en Números
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {pagina.metricas.map((m, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-[#ed741b]">
                  {m.cantidad?.toLocaleString("es-CR")}
                </p>
                <p className="mt-1 text-sm text-gray-500 capitalize">
                  {m.etiqueta}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Casos de impacto */}
      {casos.length > 0 ? (
        <>
          <div className="flex gap-2 items-center mb-6">
            <BarChart3 size={20} className="text-[#4fb9ab]" />
            <h2 className="text-xl font-bold text-gray-900">
              Casos de Impacto
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {casos.map((caso) => (
              <ImpactCaseCard key={caso.documentId || caso.id} caso={caso} />
            ))}
          </div>
        </>
      ) : (
        <div className="py-16 text-center bg-gray-50 rounded-xl">
          <BarChart3 size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">
            Aún no hay casos de impacto disponibles
          </p>
        </div>
      )}
    </div>
  );
};

export default ImpactPage;
