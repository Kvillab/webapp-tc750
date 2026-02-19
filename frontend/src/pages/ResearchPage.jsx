import { useState, useEffect } from "react";
import ResearchCard from "../components/ResearchCard";
import { getInvestigaciones } from "../services/api";

const ResearchPage = () => {
  const [investigations, setInvestigations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvestigations = async () => {
      try {
        const data = await getInvestigaciones();
        setInvestigations(data);
      } catch (error) {
        console.error("Error cargando investigaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInvestigations();
  }, []);

  const categories = [
    "all",
    ...new Set(
      investigations.map((inv) => inv.categoria?.nombre).filter(Boolean),
    ),
  ];

  const filteredStudies =
    filter === "all"
      ? investigations
      : investigations.filter((inv) => inv.categoria?.nombre === filter);

  if (loading) {
    return (
      <section className="research-page">
        <p className="py-10 text-center">Cargando investigaciones...</p>
      </section>
    );
  }

  return (
    <section className="py-12 research-page">
      <div className="mb-8 text-center page-header">
        <h1 className="mb-2 text-4xl font-bold">Sapere Aude</h1>
        <p className="text-gray-600">
          Investigaciones cortas sobre educación pública y popular
        </p>
      </div>

      <div className="px-4 mx-auto mb-8 max-w-2xl text-center research-intro">
        <p className="leading-relaxed text-gray-700">
          "Sapere Aude" es una expresión latina que significa "Atrévete a
          saber". En esta sección presentamos investigaciones realizadas por el
          TCU sobre diversos aspectos de la educación pública.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center px-4 mb-10 category-filter">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              filter === category
                ? "bg-[#ed741b] text-white"
                : "bg-[#ed741b]/10 text-[#ed741b] hover:bg-[#ed741b]/20"
            }`}
          >
            {category === "all" ? "Todas" : category}
          </button>
        ))}
      </div>

      {filteredStudies.length === 0 ? (
        <div className="py-10 text-center no-results">
          <p className="text-gray-500">
            No se encontraron investigaciones en esta categoría
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 px-4 mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-3 research-list">
          {filteredStudies.map((research) => (
            <ResearchCard key={research.id} research={research} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ResearchPage;
