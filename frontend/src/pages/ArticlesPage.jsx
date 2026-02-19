import { useState, useEffect } from "react";
import { getArticulos } from "../services/api";
import ArticleCard from "../components/ArticleCard";

export default function ArticlesPage() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticulos()
      .then(setArticulos)
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
    <div className="py-12 px-4 mx-auto max-w-4xl md:px-8">
      <h1 className="mb-3 text-3xl font-bold text-center text-gray-900 md:text-4xl">
        Explora y Aprende
      </h1>
      <p className="mb-10 text-center text-gray-500">
        Artículos y reflexiones sobre educación pública y popular
      </p>

      {articulos.length === 0 ? (
        <p className="text-center text-gray-400">
          No hay artículos disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {articulos.map((articulo) => (
            <ArticleCard key={articulo.id} articulo={articulo} />
          ))}
        </div>
      )}
    </div>
  );
}
