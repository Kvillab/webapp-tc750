import { useState, useEffect } from "react";
import { getFooter } from "../services/api";

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getFooter()
      .then(setData)
      .catch(() => {});
  }, []);

  const nombre = data?.nombreSitio ?? "TC-750";
  const lema =
    data?.lema ??
    '"Defensa de la educación pública desde la perspectiva de la educación popular"';
  const direccion = data?.direccion ?? "San José, Costa Rica";

  return (
    <footer className="bg-[#fec134]">
      <div className="flex flex-col items-center py-1 px-6 w-full text-center">
        <p className="mb-2 text-lg font-bold text-gray-900">{nombre}</p>
        <p className="mb-2 max-w-xs text-sm leading-relaxed text-center text-gray-700">
          {lema}
        </p>
        <p className="text-sm text-gray-700">Dirección: {direccion}</p>
      </div>
      <div className="py-3 px-6 border-t border-yellow-500">
        <p className="text-xs text-center text-gray-600">
          © {new Date().getFullYear()} · {nombre} Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
