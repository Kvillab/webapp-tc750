import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  List,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getEventos } from "../services/api";

const CATEGORIA_COLORS_DEFAULT = [
  "#4fb9ab",
  "#ed741b",
  "#2563eb",
  "#fec134",
  "#8b5cf6",
  "#ec4899",
  "#10b981",
  "#f97316",
];

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const CalendarPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    getEventos()
      .then(setEventos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Extraer categorías únicas de los eventos reales
  const categorias = [
    ...new Set(eventos.map((e) => e.categoria?.nombre).filter(Boolean)),
  ];

  // Asignar colores a cada categoría dinámicamente
  const categoriaColors = {};
  categorias.forEach((cat, i) => {
    categoriaColors[cat] =
      CATEGORIA_COLORS_DEFAULT[i % CATEGORIA_COLORS_DEFAULT.length];
  });

  const currentYear = new Date().getFullYear();
  const years = [
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2,
  ];

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const filteredEvents = eventos
    .filter((e) => {
      const d = new Date(e.fecha);
      const matchMonth = d.getMonth() === selectedMonth;
      const matchYear = d.getFullYear() === selectedYear;
      const catName = e.categoria?.nombre;
      const matchCat =
        selectedCategories.length === 0 || selectedCategories.includes(catName);
      return matchMonth && matchYear && matchCat;
    })
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const formatFecha = (fecha) =>
    new Date(fecha).toLocaleDateString("es-CR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const formatHora = (fecha) =>
    new Date(fecha).toLocaleTimeString("es-CR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Calendario mensual
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const getEventsForDay = (day) => {
    return eventos.filter((e) => {
      const d = new Date(e.fecha);
      const matchDay = d.getDate() === day;
      const matchMonth = d.getMonth() === selectedMonth;
      const matchYear = d.getFullYear() === selectedYear;
      const catName = e.categoria?.nombre;
      const matchCat =
        selectedCategories.length === 0 || selectedCategories.includes(catName);
      return matchDay && matchMonth && matchYear && matchCat;
    });
  };

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
          Calendario de Actividades
        </h1>
        <p className="text-gray-600">
          Descubrí y participá en nuestras próximas actividades
        </p>
      </div>

      {/* Filtros */}
      <div className="p-5 mb-8 bg-gray-50 rounded-xl">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          {/* Fecha */}
          <div className="flex gap-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="py-2 px-3 text-sm bg-white rounded-lg border border-gray-200 outline-none focus:border-[#4fb9ab]"
            >
              {MESES.map((mes, i) => (
                <option key={i} value={i}>
                  {mes}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="py-2 px-3 text-sm bg-white rounded-lg border border-gray-200 outline-none focus:border-[#4fb9ab]"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Categorías dinámicas */}
          {categorias.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => {
                const active = selectedCategories.includes(cat);
                const color = categoriaColors[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="py-1.5 px-4 text-sm font-medium rounded-full border transition-colors"
                    style={{
                      borderColor: color,
                      backgroundColor: active ? color : "transparent",
                      color: active ? "white" : color,
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Toggle vista */}
          <div className="flex overflow-hidden rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode("list")}
              className={`flex gap-1.5 items-center py-2 px-4 text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-[#ed741b] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List size={16} />
              Lista
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex gap-1.5 items-center py-2 px-4 text-sm font-medium transition-colors ${
                viewMode === "calendar"
                  ? "bg-[#ed741b] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Calendar size={16} />
              Calendario
            </button>
          </div>
        </div>
      </div>

      {/* Vista Lista */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evento) => {
              const catName = evento.categoria?.nombre;
              const color = categoriaColors[catName] || "#6b7280";
              return (
                <Link
                  to={`/vida-en-accion/${evento.slug ?? evento.documentId}`}
                  key={evento.documentId || evento.id}
                  className="flex gap-5 items-start p-5 bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Indicador de categoría */}
                  <div
                    className="self-stretch w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-3 items-center mb-2">
                      {catName && (
                        <span
                          className="py-1 px-3 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: `${color}15`,
                            color: color,
                          }}
                        >
                          {catName}
                        </span>
                      )}
                      <span className="text-sm text-gray-400">
                        {formatFecha(evento.fecha)}
                      </span>
                    </div>

                    <h3 className="mb-1 text-lg font-bold text-gray-900">
                      {evento.titulo}
                    </h3>
                    <p className="mb-3 text-sm text-gray-500">
                      {evento.descripcion}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex gap-1.5 items-center">
                        <Clock size={14} className="shrink-0" />
                        <span>{formatHora(evento.fecha)}</span>
                      </div>
                      {evento.ubicacion && (
                        <div className="flex gap-1.5 items-center">
                          <MapPin size={14} className="shrink-0" />
                          <span>{evento.ubicacion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="py-16 text-center bg-gray-50 rounded-xl">
              <Calendar size={40} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">
                No hay eventos programados para este período
              </p>
              <p className="text-sm text-gray-400">
                Intentá seleccionar otro mes o año
              </p>
            </div>
          )}
        </div>
      )}

      {/* Vista Calendario */}
      {viewMode === "calendar" && (
        <div className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm">
          {/* Header del calendario */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-bold text-gray-900">
              {MESES[selectedMonth]} {selectedYear}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
              <div
                key={d}
                className="py-3 text-xs font-semibold text-center text-gray-400"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grilla de días */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="p-2 border-r border-b border-gray-50 min-h-24"
              />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isToday =
                day === new Date().getDate() &&
                selectedMonth === new Date().getMonth() &&
                selectedYear === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className="p-2 border-r border-b border-gray-50 min-h-24"
                >
                  <span
                    className={`inline-flex justify-center items-center w-7 h-7 text-sm rounded-full ${
                      isToday
                        ? "bg-[#ed741b] text-white font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((e) => {
                      const catName = e.categoria?.nombre;
                      const color = categoriaColors[catName] || "#6b7280";
                      return (
                        <Link
                          to={`/vida-en-accion/${e.slug ?? e.documentId}`}
                          key={e.documentId || e.id}
                          className="block py-0.5 px-1.5 text-xs font-medium text-white rounded truncate hover:opacity-80"
                          style={{ backgroundColor: color }}
                          title={e.titulo}
                        >
                          {e.titulo}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
