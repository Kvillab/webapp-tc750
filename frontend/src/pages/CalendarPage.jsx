0K_TJRhkgu4oIOd_E3bAcm86MQp1OjFyOAk.01.0z1tam5fu
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  List,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const EVENTOS_EJEMPLO = [
  {
    id: 1,
    titulo: "Taller sobre Derechos Educativos",
    descripcion:
      "Taller participativo sobre derechos educativos con la comunidad",
    fecha: "2026-02-21T09:00:00",
    ubicacion: "Comunidad de Santa Ana",
    categoria: "Taller",
  },
  {
    id: 2,
    titulo: "Foro de Educación Popular",
    descripcion: "Espacio de diálogo sobre educación popular en Costa Rica",
    fecha: "2026-02-28T14:00:00",
    ubicacion: "Universidad de Costa Rica",
    categoria: "Foro",
  },
  {
    id: 3,
    titulo: "Conferencia: Derecho a la Educación",
    descripcion:
      "Conferencia magistral sobre el derecho a la educación pública",
    fecha: "2026-03-05T10:00:00",
    ubicacion: "Auditorio de Derecho, UCR",
    categoria: "Conferencia",
  },
  {
    id: 4,
    titulo: "Reunión de planificación semestral",
    descripcion: "Planificación de actividades del segundo semestre",
    fecha: "2026-03-12T16:00:00",
    ubicacion: "Sede del TCU",
    categoria: "Reunión",
  },
  {
    id: 5,
    titulo: "Taller de Materiales Educativos",
    descripcion: "Creación colectiva de materiales para comunidades",
    fecha: "2026-03-20T09:00:00",
    ubicacion: "Escuela de Santa Ana",
    categoria: "Taller",
  },
];

const CATEGORIAS = ["Taller", "Foro", "Conferencia", "Reunión"];

const CATEGORIA_COLORS = {
  Taller: "#4fb9ab",
  Foro: "#ed741b",
  Conferencia: "#2563eb",
  Reunión: "#fec134",
};

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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMode, setViewMode] = useState("list");

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

  const filteredEvents = EVENTOS_EJEMPLO.filter((e) => {
    const d = new Date(e.fecha);
    const matchMonth = d.getMonth() === selectedMonth;
    const matchYear = d.getFullYear() === selectedYear;
    const matchCat =
      selectedCategories.length === 0 ||
      selectedCategories.includes(e.categoria);
    return matchMonth && matchYear && matchCat;
  }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

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
    return EVENTOS_EJEMPLO.filter((e) => {
      const d = new Date(e.fecha);
      const matchDay = d.getDate() === day;
      const matchMonth = d.getMonth() === selectedMonth;
      const matchYear = d.getFullYear() === selectedYear;
      const matchCat =
        selectedCategories.length === 0 ||
        selectedCategories.includes(e.categoria);
      return matchDay && matchMonth && matchYear && matchCat;
    });
  };

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

          {/* Categorías */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((cat) => {
              const active = selectedCategories.includes(cat);
              const color = CATEGORIA_COLORS[cat];
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
            filteredEvents.map((evento) => (
              <div
                key={evento.id}
                className="flex gap-5 items-start p-5 bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Indicador de categoría */}
                <div
                  className="self-stretch w-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: CATEGORIA_COLORS[evento.categoria],
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-3 items-center mb-2">
                    <span
                      className="py-1 px-3 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `${CATEGORIA_COLORS[evento.categoria]}15`,
                        color: CATEGORIA_COLORS[evento.categoria],
                      }}
                    >
                      {evento.categoria}
                    </span>
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
              </div>
            ))
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
            {/* Espacios vacíos antes del primer día */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="p-2 border-r border-b border-gray-50 min-h-24"
              />
            ))}

            {/* Días del mes */}
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
                    {dayEvents.map((e) => (
                      <div
                        key={e.id}
                        className="py-0.5 px-1.5 text-xs font-medium text-white rounded truncate"
                        style={{
                          backgroundColor: CATEGORIA_COLORS[e.categoria],
                        }}
                        title={e.titulo}
                      >
                        {e.titulo}
                      </div>
                    ))}
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
