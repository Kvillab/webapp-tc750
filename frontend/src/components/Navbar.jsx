import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getHeader } from "../services/api";

const BASE_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/explora-y-aprende", label: "Explora y Aprende" },
  { to: "/sapere-aude", label: "Sapere Aude" },
  { to: "/vida-en-accion", label: "Vida en Acción" },
];

const communityLinks = [
  { to: "/proyectos", label: "Proyectos" },
  { to: "/mi-experiencia", label: "Mi Experiencia en el TCU" },
  { to: "/impacto-comunal", label: "Impacto Comunal" },
  { to: "/manual-estudiante", label: "Manual Estudiante" },
  { to: "/podcast", label: "Podcast" },
];

const afterLinks = [
  { to: "/calendario", label: "Calendario" },
  { to: "/about", label: "Sobre el TCU" },
  { to: "/contact", label: "Contacto" },
];

const allMobileLinks = [...links, ...communityLinks, ...afterLinks];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [header, setHeader] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    getHeader()
      .then(setHeader)
      .catch(() => {});
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCommunityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setCommunityOpen(false);
    setOpen(false);
  }, [location.pathname]);

  const logoUrl = header?.logo?.url
    ? header.logo.url.startsWith("http")
      ? header.logo.url
      : `${BASE_URL}${header.logo.url}`
    : null;

  const siteName = header?.nombreSitio ?? "TC-750";

  const isCommunityActive = communityLinks.some(
    (l) => location.pathname === l.to || location.pathname.startsWith(l.to + "/"),
  );

  return (
    <nav className="bg-[#fec134]">
      <div className="flex justify-between items-center py-4 px-6 mx-auto max-w-6xl">
        {/* Logo + nombre */}
        <Link to="/" className="flex gap-2 items-center">
          <div className="flex overflow-hidden justify-center items-center w-10 h-10 bg-white rounded-full shadow-sm shrink-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-xs font-bold text-gray-900">TC</span>
            )}
          </div>
          <span className="text-base font-bold text-gray-900">{siteName}</span>
        </Link>

        {/* Links escritorio */}
        <ul className="hidden gap-4 items-center lg:flex">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "font-bold text-gray-900"
                      : "font-medium text-gray-800 hover:text-gray-900"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}

          {/* Dropdown Comunidad */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCommunityOpen((v) => !v)}
              className={`flex gap-1 items-center px-3 py-2 text-sm transition-colors ${
                isCommunityActive
                  ? "font-bold text-gray-900"
                  : "font-medium text-gray-800 hover:text-gray-900"
              }`}
            >
              Comunidad
              <ChevronDown
                size={14}
                className={`transition-transform ${communityOpen ? "rotate-180" : ""}`}
              />
            </button>

            {communityOpen && (
              <ul className="absolute left-0 z-50 py-2 mt-1 w-56 bg-white rounded-lg border border-gray-200 shadow-lg">
                {communityLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `block py-2 px-4 text-sm transition-colors ${
                          isActive
                            ? "font-bold text-[#ed741b] bg-orange-50"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {afterLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "font-bold text-gray-900"
                      : "font-medium text-gray-800 hover:text-gray-900"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburguesa */}
        <button
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Menú móvil — todos los links planos */}
      {open && (
        <ul className="flex flex-col px-6 pt-2 pb-4 border-t border-yellow-300 lg:hidden">
          {allMobileLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `block py-2.5 text-sm border-b border-yellow-300 last:border-0 ${
                    isActive
                      ? "font-bold text-gray-900"
                      : "font-medium text-gray-800"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
